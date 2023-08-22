let questions = [
    {
        "question": "Was ist der Zweck des < track >-Tags und wann sollte es verwendet werden?",

        "answer1": "Das < track >-Tag wird zur Angabe von Untertiteln verwendet. Es wird normalerweise als untergeordnetes Element der Tags < audio > und < video > angewendet.",

        "answer2": "Das < track >-Tag wird zur Angabe von Untertiteln verwendet. Es wird normalerweise als untergeordnetes Element des < video >-Tags angewendet.",

        "answer3": "Das < track >-Tag wird zum Angeben von Untertiteln, Bildunterschriften und anderen Arten von zeitbasiertem Text verwendet. Es wird normalerweise als untergeordnetes Element des < video >-Tags angewendet.",

        "answer4": "Das < track >-Tag wird zum Angeben von Untertiteln, Bildunterschriften und anderen Arten von zeitbasiertem Text verwendet. Es wird normalerweise als untergeordnetes Element der Tags < audio > und < video > angewendet.",

        "rightAnswer": 4
    },
    {
        "question": "Was sind die besten Beispiele für leere Elemente?",

        "answer1": "< link >< meta >< title >",

        "answer2": "< br >< base >< source >",

        "answer3": "< input >< br >< p >",

        "answer4": "< area >< embed >< strong >",

        "rightAnswer": 2
    },
    {
        "question": "Welches Tag bzw. welche Tags betten in HTML5 eine Webseite in eine Webseite ein?",

        "answer1": "< iframe >, < frame >, and < frameset >",

        "answer2": "< frame >",

        "answer3": "< iframe >",

        "answer4": "< frame > and < frameset >",

        "rightAnswer": 3
    },
    {
        "question": "Wo kommen die Tags <header> und <footer> normalerweise vor? As children of ...",

        "answer1": "< body >, < article >, < aside >, and < section > tags",

        "answer2": "< body >, < article >, and < section > tags",

        "answer3": "< body >, < article >, < aside >, <nav>, and < section > tags",

        "answer4": "< body >, < article >, < table >, and < section > tags",

        "rightAnswer": 2
    },
    {
        "question": 'Wie lässt sich Text am besten "bold" formatieren?',

        "answer1": "< strong >",

        "answer2": "Use CSS.",

        "answer3": "< bold >",

        "answer4": "< b >",

        "rightAnswer": 1
    }
];

let currentQuestion = 0;
let amountRightQuestions = 0;
let AUDIO_SUCCESS = new Audio('./sound/win.mp3');
let AUDIO_FAIL = new Audio('./sound/fail.wav');
let AUDIO_END = new Audio('./sound/endsound.wav');

function init() {
    document.getElementById('amountQuestionsId').innerHTML = questions.length;
    document.getElementById('currentQuestionId').innerHTML = currentQuestion + 1; // currentQuestion Variable recyceln für die Seitenzahl der Fragen
    showQuestion();
}

function showQuestion() {
    if (currentQuestion == questions.length - 1) {
        document.getElementById('nextId').innerHTML = 'Abschließen'; // "Nächste Fragen"-Button ändern in "Abschließen"-Button
    }

    if (gameIsOver()) {
        showEndScreen();

    } else {
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion == questions.length;
}

function answer(selection) {
    let question = questions[currentQuestion]; // JSON beziehen aus Stelle 0
    let selectedQuestionNumber = selection.slice(-1); // aus der ID answer1-4 soll nur die letzte Ziffer genommen werden (die Zahl)

    // console.log('Gewählte Antwort: ', selectedQuestionNumber); // die letzte Ziffer aus den answer IDs -> 1, 2, 3 und 4
    // console.log('Richtige Antwort: ', question['rightAnswer']); // Aus dem JSON Stelle 0 die richtige Antwort beziehen

    let idOfRightAnswer = `answer${question['rightAnswer']}`; //answer4

    progressbar();

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        amountRightQuestions++; // Bei richtiger Frage soll die Summe der richtigen Fragen im Array erhöht werden um jeweils 1
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('nextId').disabled = false;
}

function progressbar() {
    let percent = (currentQuestion + 1) / questions.length * 100;
    console.log(percent);
    document.getElementById('progressId').innerHTML = `${percent.toFixed(0)}%`;
    document.getElementById('progressId').style = `width: ${percent}%`;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['rightAnswer'];
}

function nextQuestion() {
    currentQuestion++; // erhöhe von 0 auf 1
    init();
    document.getElementById('nextId').disabled = true;
    resetAnswerButtons();
}

function resetAnswerButtons() {
    document.getElementById('answer1').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer2').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer3').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer4').parentNode.classList.remove('bg-danger', 'bg-success');
}

function restartGame() {
    document.getElementById('quizImageId').src = './img/quizbackground.jpg';
    document.getElementById('questionBody').classList.remove('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    document.getElementById('removeQuestionContent').classList.remove('d-none');
    currentQuestion = 0;
    amountRightQuestions = 0;
    init();
}

function showEndScreen() {
    document.getElementById('removeQuestionContent').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('d-none');

    document.getElementById('amountRightQuestionsId').innerHTML = amountRightQuestions; // ist oben standartmäßig auf 0 gesetzt
    document.getElementById('endScreenAmountQuestionsId').innerHTML = questions.length;
    questionBody
    document.getElementById('questionBody').classList.add('d-none');
    document.getElementById('quizImageId').src = './img/cup-2015198_1280.png';

    document.getElementById('progressId').parentNode.classList.add('d-none');

    AUDIO_END.play();
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionId').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];
}

