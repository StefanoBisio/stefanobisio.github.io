$(document).ready(function(){

  $('#addPokemon').click(function() {
    var searchTerm = $('#pokemonName').val().toLowerCase();
    findPokemon(searchTerm);
  });

  // enables to press enter instead of the clicking the button
  $('#pokemonName').keypress(function (e) {
    if (e.which == 13) {
      event.preventDefault();
      $('#addPokemon').click();
    }
  });
  $('#random').click(function() {
    var randomId = Math.floor(Math.random()*803);
    var url = "https://pokeapi.co/api/v2/pokemon/"+ randomId;
    findPokemon(randomId);

  });

  function findPokemon(id) {
    var url = "https://pokeapi.co/api/v2/pokemon/"+ id;
    $.ajax ({
        url: url,
        datatype: "json",
        success: function (e) {
            // Success callback
            $("#hidden").fadeIn();
            $('.pokemonList').append('<li><img src="'+e.sprites.front_default+'"><h2>'+e.name+'!</h2></li>');
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){
               alert("Pokemon not found!");                
        }
      });
  }

}); //ready
