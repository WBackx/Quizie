(function() {
    var questions = [{
      question: "Waar komt techno vandaan?",
      choices: ['Detroit', 'Berlijn ', 'Rotterdam'],
      correctAnswer: 0
    }, {
      question: "Wat is de meest exclusive techno club?",
      choices: ['Perron Rotterdam', 'Berghain Berlijn', 'LelandCity Detroit'],
      correctAnswer: 1
    }, {
      question: "Wanneer kwam de eerste techno de wereld in?",
      choices: ['1970', '1980', '1990'],
      correctAnswer: 1
    }, {
      question: "Wat is GEEN kenmerk van techno?",
      choices: ['harde bass en kick', 'acoustische gitaar', 'distorded bassline'],
      correctAnswer: 1
    }, {
      question: "Hoeveel BPM is techno?",
      choices: ['90-120', '120-165', '170-220'],
      correctAnswer: 1
    },  {
        question: "Van welk festival komt dit nummer?",
        choices: ['Love Parade Berlijn', 'Rotterdam Rave', 'Tomorrowland Belgie'],
        correctAnswer: 0
    },  {
        question: "Van welke moderne techno artiest komt dit nummer?",
        choices: ['FJAAK ', 'Charlie Sparks', '9X9'],
        correctAnswer: 2
    },{
        question: "Van welke techno artiest zijn deze EP covers?",
        choices: ['TRYM ', 'VCL', 'Vladimir Dubyshkin'],
        correctAnswer: 2
    },{
        question: "Is dit techno?",
        choices: ['ja, dit is techno', 'Nee, dit is early hardcore', 'Nee, dit is hard house'],
        correctAnswer: 1
    },{
        question: "Wat zorgde er voor dat techno een comeback maakte in 2022? ",
        choices: ['Reinier Zonneveld kwam op de radio ', 'Nieuwe set van FJAAK blies op ', 'meme techno op Tiktok'],
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