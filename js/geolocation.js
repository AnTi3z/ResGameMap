function posGeoloc(map) {

	// Try W3C Geolocation
          if(navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var geolocLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                map.setCenter(geolocLatLng);
                }, function() {
                handleNoGeolocation(true);
              });
           } else {
              handleNoGeolocation(false);
           }
}

function handleNoGeolocation(browserSupportGeoloc) {
    if (browserSupportGeoloc == true) {
                alert("Geolocation service failed.");
    } else {
                alert("Your browser doesn't support geolocation.");
    }
}