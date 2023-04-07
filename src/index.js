const { default: axios } = require("axios")

const renderImages = (images) => {
    document.querySelector('.gallery').innerHTML = ''
    images.forEach(image => {
        renderImage(image)
    })
}

const renderImage = (image) => {
   
    const template = `<div class="photo-card">
    <img src="${image.largeImageURL}" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: 8</b>
      </p>
      <p class="info-item">
        <b>Views: 9</b>
      </p>
      <p class="info-item">
        <b>Comments: 10</b>
      </p>
      <p class="info-item">
        <b>Downloads: 11</b>
      </p>
    </div>
  </div>`

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', template)
}

const handleSubmit = () => {

}

const handleScroll = () => {

}



const sendApiRequest = () => {
    // https://pixabay.com/api/?key=34900911-e7685cf37eb39f583cc69787f&q=flower&image_type=photo&orientation=horizontal&safesearch=true

    const url = `https://pixabay.com/api/?key=34900911-e7685cf37eb39f583cc69787f&q=flower&image_type=photo&orientation=horizontal&safesearch=true`
    return axios.get(url)
}


document.getElementById('search-form').addEventListener('submit', event => {

    event.preventDefault()
    sendApiRequest().then(response => {
        const data = response.data
        renderImages(data.hits)
    })

})