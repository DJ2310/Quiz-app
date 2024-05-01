//References
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;

//Questions and Options array

const quizArray = [
    { id: "0",
      question: "When was Maharaja Agrasen Institute of Technology (MAIT) established?",
      options: ["2000", "2001", "2002", "2003"],
      correct: "2000"
    },
    {   id: "1",
      question: "Who is the founder of Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Maharaja Agrasen", "S.P. Gupta", "N.K. Gupta", "Narendra Modi"],
      correct: "S.P. Gupta"
    },
    {  id: "2",
      question: "What is the campus area of Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["10 acres", "20 acres", "30 acres", "40 acres"],
      correct: "40 acres"
    },
    {  id: "3",
      question: "Which university is Maharaja Agrasen Institute of Technology (MAIT) affiliated to?",
      options: ["Delhi University", "Guru Gobind Singh Indraprastha University", "Jawaharlal Nehru University", "Jamia Millia Islamia University"],
      correct: "Guru Gobind Singh Indraprastha University"
    },
    { id: "4",
      question: "Which year was the first batch of students admitted to Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["2001", "2002", "2003", "2004"],
      correct: "2001"
    },
    {  id: "5",
      question: "What is the official address of Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Rohini, Delhi", "Pitampura, Delhi", "Dwarka, Delhi", "Rohini, Ghaziabad"],
      correct: "Rohini, Delhi"
    },
    {  id: "6",
      question: "What is the motto of Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Excellence in Technology Education", "Knowledge is Power", "Quality Education for Everyone", "Service Before Self"],
      correct_answer: "Excellence in Technology Education"
    },
    { id: "7",
      question: "Who is the current Director of Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Dr. N.K. Gupta", "Dr. Sanjeev Bikhchandani", "Dr. Ashok K. Chauhan", "Dr. N.P. Singh"],
      correct: "Dr. N.P. Singh"
    },
    {  id: "8",
      question: "Which of the following courses is NOT offered by Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Computer Science Engineering", "Civil Engineering", "Biotechnology Engineering", "Electrical Engineering"],
      correct: "Biotechnology Engineering"
    },
    {  id: "9",
      question: "Which famous personality inaugurated the foundation stone of Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Narendra Modi", "Atal Bihari Vajpayee", "Manmohan Singh", "Pranab Mukherjee"],
      correct: "Atal Bihari Vajpayee"
    },
    {  id: "10",
      question: "What is the name of the sports complex at Maharaja Agrasen Institute of Technology (MAIT)?",
      options: ["Vijay Park", "Sachin Tendulkar Stadium", "Leander Paes Sports Complex", "Aryabhatta Sports Complex"],
      correct: "Aryabhatta Sports Complex"
    }
  ]
  ;

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);

        }
    })
);


//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};