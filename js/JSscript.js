var quizBody = document.getElementById("quiz-container");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("start-btn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highScoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [{
    question: "What is the name of the creator of Pokemon??",
    choiceA: "Satoshi Tajiri.",
    choiceB: "Bill Allen",
    choiceC: "Chris Black",
    choiceD: "128",
    correctAnswer: "a"},    
    {
    question: "What type of Pokemon is Pikachu?",
    choiceA: "Fire",
    choiceB: "Electric",
    choiceC: "Water",
    choiceD: "Rock",
    correctAnswer: "b"},
    {
    question: "What does Zubat not have?",
    choiceA: "Face",
    choiceB: "Arms",
    choiceC: "Eyes",
    choiceD: "Rock",
    correctAnswer: "c"},
    {
    question: "Who is the main character in Pokemon?",
    choiceA: "Bill",
    choiceB: "Tina",
    choiceC: "Sam;",
    choiceD: "Ash",
    correctAnswer: "d"},
    {
    question: "What is the English slogan for the franchise?",
    choiceA: "You want to rock with the big boys",
    choiceB: "you want to bam ba",
    choiceC: "Gotta Catch Em All!",
    choiceD: "get them all",
    correctAnswer: "c"},
    {
    question: "Who is the strongest Pokemon?",
    choiceA: "Pikachu",
    choiceB: "Zubat",
    choiceC: "Arceus",
    choiceD: "Sorlax",
    correctAnswer: "c"},
    {
    question: " Which is the smallest Pokemon?",
    choiceA: "Squirtle",
    choiceB: "Flabebe",
    choiceC: "Combee",
    choiceD: "Roselia",
    correctAnswer: "b"},
    ];
var finalQuestionIndex = quizQuestions.length;
//Randomize your question selection
var currentQuestionIndex = (Math.floor(Math.random() * finalQuestionIndex))
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};


function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
           clearInterval(timerInterval);
           showScore();
        }

      }, 1000);
    quizBody.style.display = "block";

}


function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {

        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highScoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highScoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++; 
        timeLeft -=10
        generateQuizQuestion();
        //display in the results div that the answer is wrong.

    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);