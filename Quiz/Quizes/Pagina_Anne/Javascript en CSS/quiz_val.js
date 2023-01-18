(function() {
    var questions = [{
      question: "Wie is de meest gespeelde agent?",
      choices: ['Sage', 'Reyna', 'Chamber'],
      correctAnswer: 1
    }, {
      question: "Welke werelden zijn er verwijderd in act 6?",
      choices: ['Breeze & Split', 'Pearl & Icebox', 'Breeze & Bind'],
      correctAnswer: 2
    }, {
      question: "Wat is de minst gespeelde agent?",
      choices: ['Skye', 'Harbor', 'Astra'],
      correctAnswer: 2
    }, {
      question: "Wat is de naam van de nieuwe wereld in act 6?",
      choices: ['Notis', 'Lotus', 'Pearl'],
      correctAnswer: 1
    }, {
      question: "Wie is de meest bekeken Valorant youtuber?",
      choices: ['Tarik', 'ShahZaM', 'Kyedae'],
      correctAnswer: 0
    },  {
        question: "WHoeveel health krijg je erbij als sage healt ?",
        choices: ['60 HP', '100 HP', '30 HP'],
        correctAnswer: 1
    },  {
        question: "Welk vuurwapen doet het meeste damage?",
        choices: ['Sherrif ', 'Phantom', 'Operator'],
        correctAnswer: 2
    },{
        question: "Wie is de oudste valorant agent ?",
        choices: ['Harbor', 'Sova', 'Brimstone'],
        correctAnswer: 2
    },{
        question: "Welke agent kan teleporteren?",
        choices: ['Brimstone', 'Omen', 'Astra'],
        correctAnswer: 0
    },{
        question: "Wie is de jongste agent? ",
        choices: ['Killjoy', 'Jett', 'Neon'],
        correctAnswer: 2
    }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
   // Display initial question
   displayNext();
    
   // Click handler for the 'next' button
   $('#next').on('click', function (e) {
     e.preventDefault();
     
     // Suspend click listener during fade animation
     if(quiz.is(':animated')) {        
       return false;
     }
     choose();
     
     // If no user selection, progress is stopped
     if (isNaN(selections[questionCounter])) {
       alert('Maak een Selectie');
     } else {
       questionCounter++;
       displayNext();
     }
   });
   
   // Click handler for the 'prev' button
   $('#prev').on('click', function (e) {
     e.preventDefault();
     
     if(quiz.is(':animated')) {
       return false;
     }
     choose();
     questionCounter--;
     displayNext();
   });
   
   // Click handler for the 'Start Over' button
   $('#start').on('click', function (e) {
     e.preventDefault();
     
     if(quiz.is(':animated')) {
       return false;
     }
     questionCounter = 0;
     selections = [];
     displayNext();
     $('#start').hide();
   });
   
   // Animates buttons on hover
   $('.button').on('mouseenter', function () {
     $(this).addClass('active');
   });
   $('.button').on('mouseleave', function () {
     $(this).removeClass('active');
   });
   
   // Creates and returns the div that contains the questions and 
   // the answer selections
   function createQuestionElement(index) {
     var qElement = $('<div>', {
       id: 'question'
     });
     
     var header = $('<h2>Vraag ' + (index + 1) + ':</h2>');
     qElement.append(header);
     
     var question = $('<p>').append(questions[index].question);
     qElement.append(question);
     
     var radioButtons = createRadios(index);
     qElement.append(radioButtons);
     
     return qElement;
   }
   
   // Creates a list of the answer choices as radio inputs
   function createRadios(index) {
     var radioList = $('<ul>');
     var item;
     var input = '';
     for (var i = 0; i < questions[index].choices.length; i++) {
       item = $('<li>');
       input = '<input type="radio" name="answer" value=' + i + ' />';
       input += questions[index].choices[i];
       item.append(input);
       radioList.append(item);
     }
     return radioList;
   }
   
   // Reads the user selection and pushes the value to an array
   function choose() {
     selections[questionCounter] = +$('input[name="answer"]:checked').val();
   }
   
   // Displays next requested element
   function displayNext() {
     quiz.fadeOut(function() {
       $('#question').remove();
       
       if(questionCounter < questions.length){
         var nextQuestion = createQuestionElement(questionCounter);
         quiz.append(nextQuestion).fadeIn();
         if (!(isNaN(selections[questionCounter]))) {
           $('input[value='+selections[questionCounter]+']').prop('checked', true);
         }
         
         // Controls display of 'prev' button
         if(questionCounter === 1){
           $('#prev').show();
         } else if(questionCounter === 0){
           
           $('#prev').hide();
           $('#next').show();
         }
       }else {
         var scoreElem = displayScore();
         quiz.append(scoreElem).fadeIn();
         $('#next').hide();
         $('#prev').hide();
         $('#start').show();
       }
     });
   }
   
   // Computes score and returns a paragraph element to be displayed
   function displayScore() {
     var score = $('<p>',{id: 'question'});
     
     var numCorrect = 0;
     for (var i = 0; i < selections.length; i++) {
       if (selections[i] === questions[i].correctAnswer) {
         numCorrect++;
       }
     }
     
     score.append('je hebt ' + numCorrect + ' Vragen van de  ' +questions.length + ' Goed!!!');
     return score;
   }
 })();