$(document).ready(function () {
    var lat;
    var lon;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            $.getJSON('https://api.apixu.com/v1/current.json?key=ba1bbd2f27b940639da235859171406&q=' + lat + ',' + lon, function (data) {
                console.log(data);
                //show location
                $('#location').html('in: ' + data.location.name);
                //show icon
                $('#icon').attr("src", "https:" + data.current.condition.icon);
                //show outlook
                $('#outlook').html('Outlook: '+data.current.condition.text);
                //show temperature
                $('#temp').html('The temperature is: ' + data.current.temp_c + "°C");
                //show humidity
                $('#humid').html('With a humidity of: ' + data.current.humidity + '%');
                //show wind
                $('#wind').html('The wind blows at: ' + data.current.wind_dir + ' at a speed of: ' + data.current.wind_mph + 'm/h');
                
            });


        }); //end of .getCurrentPosition
    }; //end of geolocation
}); //end of &document ready function