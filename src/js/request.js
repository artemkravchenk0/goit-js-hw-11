import { default as axios } from 'axios';
import displayMessageAfterGalleryLoaded from './messages';

const perPage = 40

const sendApiRequest = async (query, page) => {

  query = query.trim()

  if (!query) {
    return
  }

  const url = `https://pixabay.com/api/?key=34900911-e7685cf37eb39f583cc69787f&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`

  try {
    const { data } = await axios.get(url);
    const shouldDisplayInitialMessage = page === 1
    displayMessageAfterGalleryLoaded(data, shouldDisplayInitialMessage)
    return data
  } catch (error) {
    console.log()
  }
}

export default sendApiRequest