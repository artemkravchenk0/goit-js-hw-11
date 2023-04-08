import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const { default: axios } = require("axios")
const _ = require('lodash');
const lightbox = new SimpleLightbox('.gallery a', { });
let currentPixabayPage = 1
const pixabayPerPage = 40
const SCROLL_DEBOUNCE_DELAY = 500

const renderImages = (images) => {
    if (!images.length) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    images.forEach(image => {
        renderImage(image)
    })

    lightbox.refresh()
}

const renderImage = (image) => {

    const template = `<div class="photo-card">
    <a href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${image.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${image.downloads}
      </p>
    </div>
  </div>`

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', template)
}

const sendApiRequest = () => {
    const query = document.querySelector('[name=searchQuery]').value
    const url = `https://pixabay.com/api/?key=34900911-e7685cf37eb39f583cc69787f&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPixabayPage}&per_page=${pixabayPerPage}`
    return axios.get(url).then(response => {
      currentPixabayPage += 1
      return response
    })
}

const handleSubmit = event => {
  event.preventDefault()

  document.querySelector('.gallery').innerHTML = ''
  currentPixabayPage = 1
  sendApiRequest().then(response => {
    const totalHits = response.data.totalHits
    Notify.info(`Hooray! We found ${totalHits} images.`)
    const data = response.data
    renderImages(data.hits)
  })

  document.addEventListener('scroll', _.debounce(handleScroll, SCROLL_DEBOUNCE_DELAY))
}

document.getElementById('search-form').addEventListener('submit', handleSubmit)

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    sendApiRequest().then(response => {
      const data = response.data
      renderImages(data.hits)
    })
  }
}
