$(document).ready(function(){
  $('#addPokemon').click(function (e) {
    var searchTerm = $('#pokemonName').val().toLowerCase();
    var url = "https://pokeapi.co/api/v2/pokemon/"+ searchTerm;
    $.ajax ({
        url: url,
        datatype: "json",
        success: function (e) {
            // Success callback
            $("#hidden").fadeIn();
            $('.pokemonList').append('<li><img src="'+e.sprites.front_default+'"><h2>'+e.name+'!</h2></li>');
            }

      });
  }); // on click
  $('#pokemonName').keypress(function (e) {
  if (e.which == 13) {
    event.preventDefault();
    $('#addPokemon').click();

  }


});
$('#random').click(function () {
  var randomId = Math.floor(Math.random()*803);
  var url = "https://pokeapi.co/api/v2/pokemon/"+ randomId;
  $.ajax ({
      url: url,
      datatype: "json",
      success: function (e) {
          // Success callback
          $("#hidden").fadeIn();
          $('.pokemonList').append('<li><img src="'+e.sprites.front_default+'"><h2>'+e.name+'!</h2></li>');
          }

    });
});

}); //ready
