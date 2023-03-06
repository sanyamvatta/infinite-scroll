const imageContainer = document.querySelector('.image-container')
const loader = document.querySelector('.loader')
let ready = false
let imagesLoaded = 0
let totalImages = 0;
let photosArray = [];
// Unsplash api
let imageCount = 5
let initialLoad = true;
const apiKey = 'ewJqnatFGKLtDeU6CtFaIK1HnyzH4sqQ5e5KzHfL6Bs'


//Helper function to set attribures
function setAttributes(element,attributes){
  for(key in attributes){
    element.setAttribute(key,attributes[key])
  }
}

function checkInitialLoad(){
  if(!initialLoad){
    imageCount = 30;
    console.log(imageCount)
  }
}
// Image loaded function
function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded==totalImages){
    ready = true;
    loader.hidden = true;
  }
  initialLoad = false
  checkInitialLoad();
}

// Display photos to the users .Create elements for photos and adding to DOM
function displayPhotos(){
  imagesLoaded = 0;
  totalImages= photosArray.length;
  photosArray.forEach((photo)=>{
    // Creating an anchor element
    const item = document.createElement('a')
    setAttributes(item,{href: photo.links.html,target:'_blank'})
    const image = document.createElement('img')
    setAttributes(image,{src: photo.urls.regular, alt: photo.alt_description,title: photo.alt_description})
    // Event listener for image loaded
    image.addEventListener('load',imageLoaded)
    item.appendChild(image)
    imageContainer.appendChild(item)
  })
}


// Get photos from unsplash
async function getPhotos(){
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
  console.log(imageCount)
  try{
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  }catch(err){
    console.log('error')
  }
}



// Check to scroll if bottom of page


window.addEventListener('scroll',()=>{
  if(window.innerHeight+ window.scrollY >= document.body.offsetHeight- 1000 && ready){
    ready = false;
    getPhotos();
  }
})

// On load
getPhotos()