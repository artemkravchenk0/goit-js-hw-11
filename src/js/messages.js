import { Notify } from 'notiflix';

const displayMessageAfterGalleryLoaded = ({ totalHits, hits }, shouldDisplayInitialMessage) => {
  if (shouldDisplayInitialMessage && totalHits > 0) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  if (totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else if (hits.length === 0) {
    Notify.failure('We are sorry, but you have reached the end of search results.');
  }
}



export default displayMessageAfterGalleryLoaded;
