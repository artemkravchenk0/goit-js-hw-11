import { default as axios } from 'axios';
import displayMessageAfterGalleryLoaded from './messages';
import refs from './refs';

const sendApiRequest = async (query, page) => {

  query = query.trim()

  if (!query) {
    return
  }

  const url = `https://pixabay.com/api/?key=34900911-e7685cf37eb39f583cc69787f&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${refs.galleryPerPage}`

  const shouldDisplayInitialMessage = page === 1

  let galleryData;
  try {
    const { data } = await axios.get(url);
    galleryData = data;
  } catch (error) {
    console.log(error)
    galleryData = {
      hits: [],
      totalHits: 0
    };
  }

  displayMessageAfterGalleryLoaded(galleryData, shouldDisplayInitialMessage)
  return galleryData;
}

export default sendApiRequest