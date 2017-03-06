function GeoLocationControl(geoLocControlDiv, map){
    geoLocControlDiv.className = 'controls';
    var controlButton = document.createElement('div');
    controlButton.className = 'geolocButton';

    geoLocControlDiv.appendChild(controlButton);

    google.maps.event.addDomListener(controlButton, 'click', function() { posGeoloc(map); map.setZoom(16); });
}