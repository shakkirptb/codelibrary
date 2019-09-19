var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 52.53, lng: 13.403 },
        zoom: 11
    });
}

$(function () {

    const CAR_IMAGE = "img/car-black-s.png";
    //const CAR_IMAGE = "img/car-yellow-s.png";
    //const CAR_IMAGE = "img/cars-s.png";
    //const CAR_IMAGE = "img/cars-m.png";

    $.ajax({
        url:"/vehicles/locations",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if(data){
                for(let vehicle in data){
                    setMarker(vehicle,data[vehicle]);
                }
            }
        }
    });
    function setMarker(vehicle,myLatLng){
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: CAR_IMAGE,
            title: vehicle
          });
    }
});