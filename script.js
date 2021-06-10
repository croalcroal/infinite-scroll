const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
let count = 5;
const apiKey = 'gxocVlV5OolIpu1C6DexhpfAgdfp78_meUZtCxR7mYc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check id all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		// hide loader once images are loaded
		loader.hidden = true;
		count = 30;
	}
}

// Helper function for attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;

	// Run function for each obj in array
	photosArray.forEach((photo) => {
		// Create <a> to link to unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		});
		// Create image for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		// Event listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		//console.log(photosArray);
	} catch (error) {
		// Catch error here
		console.log(error);
	}
}

// check to see if scroll event is near bottom of the page
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
})

// on Load 
getPhotos();