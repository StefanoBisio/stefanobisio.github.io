$(document).ready(function(){
  //On click run
  $("#search").click(function(){
    //Get value of input field
 var searchTerm = $('#searchTerm').val();
//Run ajax and get return in data type JSON
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";
    console.log(url);
      $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data) {
          $('#output').html('');
          for(var i=0;i<data[1].length;i++){
            $('#output').prepend("<div><div><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>" );        
          }    
   $("#searchTerm").val('');
        },
        error: function (errorMessage) {
         console.log(errorMessage);
        }
    });
    

  });
      $("#searchTerm").keypress(function(e){
      if(e.which==13){
        $("#search").click();
      }
    });
});