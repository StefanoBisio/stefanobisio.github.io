$(document).ready(function() {

    (function startQuiz(){
        // Object to store answers
        this.settings  = {
            correctAnswers:["Soul Bossanova", "Danger", "Sharks with lasers beams on their heads", "Mr. Bigglesworth", "Carnies","Tom Cruise","What the World Needs Now"],
            results:[]
        };
        /* Count of correct answers*/
        var count =0;
        /* Used to index through both arrays, correct answers and user answers*/
        var progress =0;
         
        /* Animation on loading of the page*/
        this.loadQuiz = function(){
            $('.panel_one h1').show("drop",500,function(){
              $('.start_quiz').addClass("started",500)
            });
            $('.start_quiz').on("click",function(){
                // Calling the function used to advance from one panel to the next
                showPanel(1);
            });
        };

        /* Passing to the function the panel we want to show, which is the first one (1)*/
        this.showPanel = function(position){
            // Targeting panel we want to hide, which is the previous one (-1)
            var current =  $('div[data-panel="'+ (position - 1) +'"]');

            current.find('.wrapper').animate({left:"-=100px",opacity:0},500,function(){
                // hide current
                current.addClass('hidden');
                // show next
                var next = $('div[data-panel="'+ position +'"]');
                next.removeClass('hidden');
                // Function to hide current panel and show the next
                showNext(next);
                // Function to show next panel
                listenNext();
            });
        };
        
        /* Getting the content of the panel we want to show (next) and animating it in*/
        this.showNext = function(next) {
            var wrapper = next.find('.wrapper');
            wrapper.fadeIn('500', function(){
            manageOptions(next);
            
            });
        };
        
        /* What to do when "submit" is clicked */
        this.listenNext = function() {
             /* The .off() is to address a bug that executes the click twice*/
            $('.submit').off().on('click', function(){
                var next = $(this).data('next');
                if (validateSelection($(this))) {
                    showPanel(next); 
                    showProgress(next);
                }
            });
        };
        
        /* Validating current panel (Has it been answered)*/
        this.validateSelection = function($this){
            var parent = $this.parents().eq(1);
            if (parent.hasClass('valid')){
                return true;
            } else {
                $('.error').fadeIn('300', function(){
                    $(this).delay(1000).fadeOut('300');
                });
                return false; 
            }
        };
          
        /* Function to manage the showing of answers in succession */
        this.manageOptions = function(next){
            var options = next.find('.options');
            var childrens = options.find('div');
            var counter =0;
            // "i" iterates the .each(), "el" represents the current element
            childrens.each(function(i,el){
                // animating them 500ms from each other
                $(el).delay(counter).fadeIn(300);
                counter += 400;
            });

            childrens.on('click', function(){
                childrens.removeClass('active');
                // adding "valid" on the whole panel. No styling, just validation. An answer HAS been clicked
                next.addClass('valid');
                $(this).addClass('active');
            });
        };

        /* Progress bar */
        this.showProgress = function(panel){
            // increment width of progress bar
            $('.progress .bar').animate({"width": "+=14.28%"},500);
            // When we click on Submit, the $this will be THE NEXT set of answers, that is why 'panel' has a -1
            var options = $('div[data-panel="'+ (panel -1) +'"]').find('.options');
            options.find('div').each(function(i,el){
                if($(this).hasClass('active')){
                    settings.results.push($(this).text());
                }
            });
            
        /* Checking for correct andwers and printing them in last panel */    
            if(settings.results[progress] == settings.correctAnswers[progress]){
               count++;
                
            }
                progress++;
                $('#rightCounter').text("");
                $('#rightCounter').text(count);
                
            
        };
            
        loadQuiz();
        
    })(); /* End of startQuiz */

}); /* Ready */