"use strict";

//So... What's preventing someone from stealing an access token exactly?
mapboxgl.accessToken = 'pk.eyJ1IjoiZWhyZW4tc3RyaWZsaW5nIiwiYSI6ImNscTN3dmZoYjAxMG4ydm14ZnNjaWtqOW0ifQ.PtNGzOxZJvB9XIJGME7k3Q';

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-40, 20], // starting position [lng, lat]
	zoom: 1 // starting zoom
});
const marker = new mapboxgl.Marker({
	color: "#0000ff"
});

let mapLoaded = false;

function loadMap(e) {
	navigator.geolocation.getCurrentPosition(setPosition, positionError);
}

/**@param {PositionOptions} */
function setPosition(position) {
	const longLat = [position.coords.longitude, position.coords.latitude];

	if (mapLoaded) {
		map.flyTo({center: longLat, zoom: 16});
	} else {
		map.jumpTo({center: longLat, zoom: 16});
		mapLoaded = true;
	}

	// Create a new marker. https://docs.mapbox.com/mapbox-gl-js/api/markers/
	marker.remove(); //calling remove while on a map also causes no issues
	marker.setLngLat(longLat).addTo(map); //calling addTo multiple times seems to cause no issues
}

function positionError(error) {

}

// loadMap();

[...document.getElementsByClassName("track")].forEach(element=>{
	element.addEventListener("click", loadMap);
})