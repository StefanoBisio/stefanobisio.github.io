$(document).ready(function(){
   var scroll_start = 0;
   var startchange = $('.portfolio');
   //  Setting the element that will trigger the change in background
   var offset = startchange.offset();
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $('.navbar').css('background-color', '#333');
       } else {
          $('.navbar').css('background-color', 'transparent');
       }
   });
});
