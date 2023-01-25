(function() {
    var questions = [{
      question: "Welk Beroep Beoefend Saul?",
      choices: ['Film Regisseur', 'Advocaat ', 'Baas van een Verzekerings bedrijf'],
      correctAnswer: 1
    }, {
      question: "Wat is Saul Goodman's echte naam?",
      choices: ['James Morgan McGill', 'Jeffrey James McGill', 'James McGill Morgan'],
      correctAnswer: 0
    }, {
      question: "Hoe heet het advocaten kantoor waar Jimmy en zijn broer gewerkt hebben?",
      choices: ['Hamlin & McGill', 'Hamlin Hamlin & McGill', 'Hamlin & Associates'],
      correctAnswer: 1
    }, {
      question: "Met wie heeft saul een relatie?",
      choices: ['Kim Wexler', 'Kat Whistler', 'Howard Hamlin'],
      correctAnswer: 0
    }, {
      question: "Waar staat Saul Good Man voor?",
      choices: ['Salamander goede man', 'Het heeft geen betekenis', 'it’s all good man'],
      correctAnswer: 2
    },  {
        question: "Wat is de slogan van Saul Good Man?",
        choices: ['Here to help!', 'Tis all good, man', 'Hij heeft geen slogan'],
        correctAnswer: 1
    },  {
        question: "Wat is de naam van Saul zijn broer?",
        choices: ['Josh ', 'Chuck', 'Howard'],
        correctAnswer: 1
    },{
        question: "Met welke serie komt Saul Good Man samen?",
        choices: ['Braking bad ', 'Black Mirror', 'Suits'],
        correctAnswer: 0
    },{
        question: "Waardoor komt Saul in contact met Fring?",
        choices: ['Saul hielp het kartel als een advocaat', 'Saul wou kip kopen', 'Saul vind fring aardig'],
        correctAnswer: 0
    },{
        question: "Welke ziekte heeft Chuck? ",
        choices: ['Ademhalings problemen ', 'Kan slecht tegen licht ', 'Kan slecht tegen elektrische straling'],
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
      
      score.append('Je hebt de quiz Afgerond! | je hebt ' + numCorrect + ' Vragen van de  ' +questions.length + ' Goed!!!');
      return score;
    }
  })();