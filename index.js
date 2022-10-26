//getting the HTML elements
const questionTAG = document.getElementById("question");
const quizTAG = document.getElementById("quiz");
const progressTAG = document.getElementById("progress");

//function to create question objects
function question(text, options, correctAns) {
  this.text = text;
  this.options = options;
  this.correctAns = correctAns;
}

//function to create quiz objects
function quizAssets(questionBank) {
  this.questionBank = questionBank;
  this.score = 0;
  this.questionNo = 0;
}

//method to return 1 after we are passed the last question
quizAssets.prototype.isQuizOver = function () {
  return this.questionNo === this.questionBank.length;
};

//method to return the currect question object from the bank
quizAssets.prototype.getQuestionByNo = function () {
  return this.questionBank[this.questionNo];
};

//method to increment score and question number
quizAssets.prototype.compareSelectionWithAnswer = function (selection) {
  //checking if selection option is the correct answer
  if (this.getQuestionByNo().correctAns === selection) this.score++;
  this.questionNo++;
};

//creating the question bank by making multiple question objects
let questionBank = [
  new question(
    "Javascript supports:",
    ["XHTML", "CSS", "HTML", "Functions"],
    "Functions"
  ),
  new question(
    "Which language is used for styling webpages?",
    ["HTML", "CSS", "jQuery", "XML"],
    "CSS"
  ),
  new question(
    "Which of the following is not a JS framework?",
    ["jQuery", "Python", "Django", "Node.js"],
    "Django"
  ),
  new question(
    "Which technology is used to connect to databases?",
    ["PHP", "HTML", "JS", "SQL"],
    "PHP"
  ),
  new question(
    "Javascript is a:",
    ["Language", "Programming language", "Development tool", "Database"],
    "Programming language"
  ),
];

//function to show score at the end of the quiz
function displayScore() {
  //creating new HTML sctructure to display score and appending the result
  let result = "<h1>Result</h1>";
  result +=
    "<h2 id='score'> You have scored " +
    quiz.score +
    " out of " +
    quiz.questionBank.length +
    ".<br><br> Percentage: " +
    (quiz.score / quiz.questionBank.length) * 100 +
    "%";
  quizTAG.innerHTML = result;
}

//function to make the buttons interactive and check answer
function handleButtonClick(btnID, selection) {
  let selectedBtn = document.getElementById(btnID);
  //adding a click event listener to detect a button click
  selectedBtn.onclick = function () {
    quiz.compareSelectionWithAnswer(selection);
    loadQuestions();
  };
}

//function to show progress through the quiz
function showQuestionNo() {
  progressTAG.innerHTML =
    "Question " + (quiz.questionNo + 1) + " of " + quiz.questionBank.length;
}

//function to load a new question and score at the end
function loadQuestions() {
  //checking if quiz has ended
  if (quiz.isQuizOver()) displayScore();
  else {
    questionTAG.innerHTML = quiz.getQuestionByNo().text;
    let questionOptions = quiz.getQuestionByNo().options;
    let spanTAG;
    //iterating through the options and filling inside the span tag
    for (let i = 0; i < questionOptions.length; i++) {
      spanTAG = document.getElementById("choice" + i);
      spanTAG.innerHTML = questionOptions[i];
      handleButtonClick("btn" + i, questionOptions[i]);
    }
    showQuestionNo();
  }
}

//creating a new quiz using quiz object
let quiz = new quizAssets(questionBank);
loadQuestions();
