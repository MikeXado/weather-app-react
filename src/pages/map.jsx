import React ,  {useRef , useEffect , useState} from 'react';
import '../App.scss'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlzc3NoYW55YTIxIiwiYSI6ImNsMGgweTU4czAxdGkzaXA1b3dhdzU3NmMifQ.RSEheUqFs5WpOaDss_0BhA';
   
function Map () {
    const mapContainer = useRef();
    const map = useRef(null);
    const [lng, setLng] = useState(28.86);
    const [lat, setLat] = useState(47.01); 
    const [weather , setWeather] = useState({});
    const [zoom, setZoom] = useState(6);
     const api = `
     https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${lat},${lng}&aqi=yes`;
 

     

    useEffect(() => {
      if(map.current) return;
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/missshanya21/cl60n5123000d14nus1tzp9ur',
      center: [lng, lat],
      projection: 'naturalEarth',
      zoom: zoom,
      
      });
      map.current.addControl(new mapboxgl.FullscreenControl());
     
      map.current.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
        );
   });

   useEffect(() => {
      if (!map.current) return; // wait for map to initialize
    
     map.current.on('click', (e) => {
      var coordinates = e.lngLat;
      setLat(e.lngLat.lat)
      setLng(e.lngLat.lng)
      new mapboxgl.Popup({className: "weather-popup" , closeOnMove: true , closeButton: false})
      .setLngLat(coordinates)
      .setHTML(
       `<div className="popup-content__item">Country:<span>${weather.location?.country}</span></div><div className="popup-content__item">City:<span>${weather.location?.name}</span></div><div className="popup-content__item">Temperature:<span>${Math.floor(weather.current?.temp_c)}&degC</span></div><div className="popup-content__item">Precipitation:<span>${weather.current?.precip_mm} mm</span></div>`
      )
      .addTo(map.current);
    });
   
   })

useEffect(() => {
      fetch(api).then((response) => response.json()).then((weather) => setWeather(weather));
     } ,[api])
     
return (
      
      <div>
      <div ref={mapContainer} className="map-container" />
      </div>
    )
}

export {Map};