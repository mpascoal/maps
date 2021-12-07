import "./style.css";

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const route = urlParams.get('route')
const data = require('../data.json')


console.log(find(data,route))

function find(data, route) {
  for (var i = 0; i < data.length; i++){
    // look for the entry with a matching `code` value
    if (data[i].route == route){
        return data[i]
    }
  }
}


function initMap(): void {
  const directionsService = new google.maps.DirectionsService()
  const directionsRenderer = new google.maps.DirectionsRenderer()
  const r = find(data,route)
  const waypoints = r.locations
  const origin = r.origin
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 7,
      center: origin
    }
  );

  directionsRenderer.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsRenderer,origin,waypoints);
  
}


function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer,
  originValue: string,
  waypointValue: google.maps.DirectionsWaypoint[]
  ) {
  directionsService
    .route({
      origin: originValue,
      destination: originValue,
      waypoints: waypointValue,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
export { initMap };
