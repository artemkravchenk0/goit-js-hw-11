import { Notify } from 'notiflix';

const displayMessageAfterGalleryLoaded = ({ totalHits }, shouldDisplayInitialMessage) => {
  if (shouldDisplayInitialMessage && totalHits > 0) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  if (totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

export default displayMessageAfterGalleryLoaded;
