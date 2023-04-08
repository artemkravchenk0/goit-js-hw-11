import loadGalleryData from './js/request';
import renderImages from './js/gallery';
import "simplelightbox/dist/simple-lightbox.min.css";
import refs from './js/refs';

let currentPage = 1

const handleSubmit = async event => {
  event.preventDefault()

  refs.gallery.innerHTML = ''
  let currentPage = 1
  const galleryData = await loadGalleryData(refs.input.value, currentPage)
  if (galleryData) {
    renderImages(galleryData)
  }
  document.addEventListener('scroll', handleScroll)
}

refs.searchForm.addEventListener('submit', handleSubmit)

const handleScroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    currentPage += 1
    const galleryData = await loadGalleryData(refs.input.value, currentPage)
    if (galleryData) {
      renderImages(galleryData)
    }
  }
}
