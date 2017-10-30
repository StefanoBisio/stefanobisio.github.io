var i=0;

function main(){
    $.getJSON('https://opentdb.com/api.php?amount=50&category=11&type=multiple', function (data) {



            function go(){
                
                /* Saving JSON in localstorage and naming result "stored" */
                var source = data;
                localStorage.setItem('local', JSON.stringify(source));
                var stored = JSON.parse(localStorage.getItem('local'));
                console.log(stored);
                
                do {
                                    
                    var instance;

                    /* Making an array out of one JSON result*/
                    var qa = [
                        stored.results[ i ].correct_answer,
                        stored.results[ i ].incorrect_answers["0"],
                        stored.results[ i ].incorrect_answers["1"],
                        stored.results[ i ].incorrect_answers["2"]];

                    /* Shuffling array*/
                    function shuffle(arra1) {
                    var ctr = arra1.length, temp, index;

                // While there are elements in the array
                    while (ctr > 0) {
                // Pick a random index
                        index = Math.floor(Math.random() * ctr) ;
                // Decrease ctr by 1
                        ctr--;
                // And swap the last element with it
                        temp = arra1[ctr];
                        arra1[ctr] = arra1[index];
                        arra1[index] = temp;
                    }
                    return arra1;
                }
                    var instance = shuffle(qa);            

                    /* Adding correct answer on top, for correct answer check */
                    instance.unshift(stored.results[ i ].correct_answer);

                    /* Adding question on top.
                    /* We now have an array that contains, in order:
                        the question
                        the correct answer
                        the 4 possibilities */
                    instance.unshift(stored.results[ i ].question);

                    /* Resetting and Displaying question */
                    $('#question').html("");
                    $('#question').html(instance[0]);

                    /* Resetting and Displaying answers */
                    $('#q1').html("").removeClass("correct").removeClass("wrong");
                    $('#q2').html("").removeClass("correct").removeClass("wrong");
                    $('#q3').html("").removeClass("correct").removeClass("wrong");
                    $('#q4').html("").removeClass("correct").removeClass("wrong");
                    $('#q1').html(instance[2]);
                    $('#q2').html(instance[3]);
                    $('#q3').html(instance[4]);
                    $('#q4').html(instance[5]);

                    /* STILL BASIC - Question&Answer confrontation logic */
                    $('.questions').off().click(function(){
                        var answer = $(this).html();
                        if (answer == instance[1]){
                             $(this).addClass("correct");
                                 setTimeout(go, 900);
                        } else {
                            $(this).addClass("wrong");
                            $('.questions:contains('+instance[1]+')').addClass("correct");
                                 setTimeout(go, 1100);
                        }
                    })
                    
                i++;
                } while (i< stored.length);
                
        } go();

      }) /*json call*/

    } main()