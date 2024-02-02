const questions = [
  {
    question: "Which is the largest animal in the world ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Dog", correct: false },
      { text: "Whale", correct: true },
      { text: "Tiger", correct: false },
    ],
  },

  {
    question: "Which is the odd number ?",
    answers: [
      { text: "03", correct: true },
      { text: "12", correct: false },
      { text: "16", correct: false },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Thar", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antartica", correct: true },
    ],
  },
  {
    question: "Which is the continent among these?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Mumbai", correct: false },
      { text: "USA", correct: false },
      { text: "Canada", correct: false },
    ],
  },
  {
    question: "Which is a Bird among these ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Dog", correct: false },
      { text: "Crow", correct: true },
      { text: "Tiger", correct: false },
    ],
  },
];

const questionElement = document.getElementById("questions");

const answerButtons = document.getElementById("buttons");

const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function start() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const buttons = document.createElement("button");
    buttons.innerHTML = answer.text;
    buttons.classList.add("btn");
    answerButtons.appendChild(buttons);

    if (answer.correct) {
      buttons.dataset.correct = answer.correct;
    }

    buttons.addEventListener("click", selectAnswers);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswers(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((buttons) => {
    if (buttons.dataset.correct === "true") {
      buttons.classList.add("correct");
    }
    buttons.disabled = true;
  });
  nextButton.style.display = "block";
}

function totalScore(){
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        totalScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        start();
    }
})

start();
