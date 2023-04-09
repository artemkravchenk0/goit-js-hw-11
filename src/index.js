import loadGalleryData from './js/request';
import renderImages from './js/gallery';
import "simplelightbox/dist/simple-lightbox.min.css";
import refs from './js/refs';
import displayMessageAfterGalleryLoaded from './js/messages';

let currentPage = 1
let isAllGalleryLoaded = false

const handleSubmit = async event => {
  event.preventDefault()

  refs.gallery.innerHTML = ''
  let currentPage = 1
  const galleryData = await loadGalleryData(refs.input.value, currentPage)
  if (galleryData) {
    isAllGalleryLoaded = galleryData.hits.length < refs.galleryPerPage
    renderImages(galleryData)
  }
  document.addEventListener('scroll', handleScroll)
}

refs.searchForm.addEventListener('submit', handleSubmit)

const handleScroll = async () => {

  if (isAllGalleryLoaded) {
    return
  }

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    currentPage += 1
    const galleryData = await loadGalleryData(refs.input.value, currentPage)
    if (galleryData) {
      isAllGalleryLoaded = galleryData.hits.length === 0
      renderImages(galleryData)
    }
  }
}
