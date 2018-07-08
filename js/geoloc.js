var animationInterval
var noGeoLoc = false

function MyLocationButton(locationContainer, map) {
    var locationButton = document.createElement('button')
    //locationButton.className = 'locButton'
    locationButton.style.backgroundColor = '#fff'
    locationButton.style.border = 'none'
    locationButton.style.outline = 'none'
    locationButton.style.width = '28px'
    locationButton.style.height = '28px'
    locationButton.style.borderRadius = '2px'
    locationButton.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
    locationButton.style.cursor = 'pointer'
    locationButton.style.marginRight = '10px'
    locationButton.style.padding = '0px'
    //------
    locationButton.title = 'My Location'
    locationContainer.appendChild(locationButton)

    var locationIcon = document.createElement('div')
    //locationButton.className = 'locIcon'
    locationIcon.style.margin = '5px'
    locationIcon.style.width = '18px'
    locationIcon.style.height = '18px'
    locationIcon.style.backgroundImage = 'url(img/mylocation-sprite-1x.png)'
    locationIcon.style.backgroundSize = '180px 18px'
    locationIcon.style.backgroundPosition = '0px 0px'
    locationIcon.style.backgroundRepeat = 'no-repeat'
    //------
    locationIcon.id = 'current-location'
    locationButton.appendChild(locationIcon)

    locationButton.addEventListener('click', function () {
        centerMapOnLocation(map)
    })

    locationContainer.index = 1

    google.maps.event.addListener(map, 'dragend', function () {
        var currentLocation = document.getElementById('current-location')
        if (noGeoLoc) currentLocation.style.backgroundPosition = '-18px 0px'
        else currentLocation.style.backgroundPosition = '0px 0px'
    })
}

function centerMapOnLocation(map) {
    var currentLocation = document.getElementById('current-location')
    var imgX = '0'
    clearInterval(animationInterval)
    animationInterval = setInterval(function () {
        if (imgX === '-18') {
            imgX = '0'
        } else {
            imgX = '-18'
        }
        currentLocation.style.backgroundPosition = imgX + 'px 0'
    }, 500)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

            map.setCenter(latlng)
            clearInterval(animationInterval)
            noGeoLoc = false
            currentLocation.style.backgroundPosition = '-144px 0px'
        }, function() {
            clearInterval(animationInterval)
            noGeoLoc = true
            currentLocation.style.backgroundPosition = '-18px 0px'
        })
    } else {
        clearInterval(animationInterval)
        noGeoLoc = true
        currentLocation.style.backgroundPosition = '-18px 0px'
    }
}
