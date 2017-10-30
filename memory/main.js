
$('#start').on("click", function(){

  // Checking if grid is empty (game is in progress)
  if ($("#grid").children().length == 0) {

      // Populating grid of hidden shuffled tiles
      gameOn();
      $('#start').html("Give up");

      } else {
        $('h1').html('Hello and welcome to memory');
        $('#start').html("Start again");

        // Emptying the grid on "Start again" and reshuffling
        $('#grid').empty();
        }

 });// Click of start button


function gameOn() {
  var i=0;

  // all the animals! = ["leopard","snail","deer","parrot","rabbit","bear","lion","fish","crab","cow","pig","panda","corgi","turtle","rhinoceros","shark"];
  var animals = ["turtle","snail","corgi","parrot","rabbit","bear","panda","fish","crab","pig","shark","rhinoceros"];
  var images = [];

  // get images, place them in an array & randomize the order
  for (i = 0; i < 12; i++) { 
    var img = 'https://png.icons8.com/' + animals[i];
    images.push(img);
    images.push(img);
  }
  randomizeImages();

  // output images then hide them
  var output = "<ul>"; 
  for (var i = 0; i < 24; i++) { 
    output += "<li>";
    output += "<img src = '" + images[i] + "/color/96' width='96' height='96''/>";
    output += "</li>";
  }
  output += "</ul>";
  document.getElementById("grid").innerHTML = output;
  $("img").hide();

  var guess1 = "";
  var guess2 = "";
  var count = 0;
  var winCount=12;

  $("li").click(function() {
    if ((count < 2) === true) {
      
      // increment guess count, show image, mark it as face up
      count++;
      $(this).children("img").show();
      // $(this).children("img").addClass("face-up");
      
      //First turn
      if (count === 1 ) { 
        guess1 = $(this).children("img").attr("src"); 
      }   
      
      //Second turn
      else { 
        guess2 = $(this).children("img").attr("src"); 
        
        // Checking for ing pair
        if (guess1 === guess2) {
          winCount --; 

          // Checking for winning state (no more pairs)
          if (winCount>0) {

            // Briefly displaying positive exclamation
            var positiveArr = ['SofiShsticated!', 'Snailed it!', 'Chimpion!', 'Turtley awesome!', 'Amoosing!', 'Goose bumps!', 'Pawsitive!', 'Pandamonium!', "Cat-astrophe!"];
            var randomWow = Math.floor((Math.random() * 8) + 1);
            //Show exclamation
            $('h1').html(positiveArr[randomWow]);
            //Back to normal after 1 sec
            setTimeout(function positiveExclamation(){
              $('h1').html('Hello and welcome to memory');
            }, 1000);
            
            $("li").children("img[src='" + guess2 + "']").addClass("match");
            } else {
              $('h1').html('Awesome! You beat the game!');
              $('img').addClass('won');
              $('body').scrollTop(0);
              $('#start').html("Restart");


            } 
        } 
        
        // If miss, hide after 1 second
        else { 
          setTimeout(function() {
            $("img").not(".match").hide();
            $("img").not(".match").removeClass("face-up");
          }, 700);
        }

        // Resetting count
        count = 0; 
      }
    }
  });

  // randomize array of images
  function randomizeImages(){
    Array.prototype.randomize = function()
    {
      var i = this.length, j, temp;
      while ( --i )
      {
        j = Math.floor( Math.random() * (i - 1) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
    };
    
    images.randomize();
  }

}