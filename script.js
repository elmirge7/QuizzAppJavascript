const quizzData = [
    {
        question: 'Qui a créé Node.js ?',
        a: 'Elon Musk',
        b: 'Brendan Eich',
        c: 'Akira Toriyama',
        d: 'Ryan Dahl',
        correct: 'd'
    },
    {
        question: 'Quel moteur JavaScript est utilisé par Node.js ?',
        a: 'V8',
        b: 'SpiderMonkey',
        c: 'Chakra',
        d: 'Rhino',
        correct: 'a'
    },
    {
        question: 'Quel module est utilisé pour gérer les fichiers dans Node.js ?',
        a: 'fs',
        b: 'http',
        c: 'path',
        d: 'net',
        correct: 'a'
    },
    {
        question: 'Quelle méthode est utilisée pour importer un module dans Node.js ?',
        a: 'import',
        b: 'require',
        c: 'include',
        d: 'from',
        correct: 'b'
    },
    {
        question: 'Quelle est la principale utilisation de npm dans le contexte de Node.js ?',
        a: 'Gestion des bases de données',
        b: 'Gestion des packages et des dépendances',
        c: 'Création d\'interfaces graphiques',
        d: 'Déploiement de serveurs',
        correct: 'b'
    },
    {
        question: 'Quel gestionnaire de versions est souvent utilisé avec Node.js pour gérer les dépendances de projet ?',
        a: 'Git',
        b: 'SVN',
        c: 'Mercurial',
        d: 'npm',
        correct: 'd'
    },
    {
        question: 'Quelle méthode est utilisée pour créer un serveur HTTP simple dans Node.js ?',
        a: 'createServer',
        b: 'startServer',
        c: 'initServer',
        d: 'launchServer',
        correct: 'a'
    },
    {
        question: 'Quel objet JavaScript est utilisé pour représenter une erreur dans Node.js ?',
        a: 'Exception',
        b: 'Error',
        c: 'Fault',
        d: 'Bug',
        correct: 'b'
    },
    {
        question: 'Quel module Node.js est utilisé pour gérer les requêtes HTTP et les réponses ?',
        a: 'http',
        b: 'request',
        c: 'url',
        d: 'querystring',
        correct: 'a'
    },
    {
        question: 'Quelle méthode est utilisée pour installer des dépendances à partir du fichier package.json ?',
        a: 'install',
        b: 'update',
        c: 'add',
        d: 'npm install',
        correct: 'd'
    }
]; // Mon tableau de questions et réponses.


const answersElements = document.querySelectorAll('.answer'); // récupération de tous les radio button
const questionElement = document.getElementById("question"); // Représente mon h2
const a_text = document.getElementById("a_text"); // Représente mon premier label
const b_text = document.getElementById("b_text"); // Représente mon deuxième label
const c_text = document.getElementById("c_text"); // Représente mon troisième label
const d_text = document.getElementById("d_text"); // Représente mon quatrième label
const submitButton = document.getElementById('submit'); // Récupération du bouton
const quizzContainerElement = document.getElementById("quiz"); // récupération du container complet de quiz
const numberQuestionElement = document.getElementById("number");// Récupération de l'endroit avec les questions et les questions restantes
const timerElement = document.getElementById("timer");

let currentQuizz = 0; // Numéro de la question
let answer = undefined;
let score = 0; // suivi du score
let timer = 15;

loadQuizz(); //Appel de la fonction

// Fonction qui gère le timer
function timerQuizz() {
    let timerInterval; // Déclaration de l'intervalle
    timerElement.innerText = timer; // Modification du HTML
    if (timer === 0) { // Si le timer atteint 0
        clearInterval(timerInterval); // Arrête l'intervalle lorsque le timer atteint 0
        currentQuizz++;
        resetTimer();
        if(currentQuizz < quizzData.length) { // On vérifie si il reste encore des questions ou non
            loadQuizz(); // et on rappelle à chaque fois le loadQuizz pour afficher les questions de l'objet suivant
        } else {
            quizzContainerElement.innerHTML = `<h2> Tu as répondu correctement à ${score} / ${quizzData.length} questions ! </h2> <button onclick="location.reload()">Reload</button>`
        }
    } else {
        timer--;
    }
}

function resetTimer() {
    timer = 15;
}

timerInterval = setInterval(timerQuizz, 1000);

// fonction qui récupère le numéro de question
function getNumberQuestion() {
    numberQuestionElement.innerHTML = `${currentQuizz + 1} / ${quizzData.length}`
}


// fonction pour loader le quizz
function loadQuizz() {
    deselectAnswer();
    getNumberQuestion();
    const currentQuizzData = quizzData[currentQuizz]; // Ici le currentQuizz est à 0, on récupère donc la premier objet du tableau [0]
    questionElement.innerText = currentQuizzData.question; // On modifie le h2 de base par la question
    a_text.innerText = currentQuizzData.a; // On modifie la réponse a de base par la réponse a de l'objet du tableau
    b_text.innerText = currentQuizzData.b; // On modifie la réponse b de base par la réponse b de l'objet du tableau
    c_text.innerText = currentQuizzData.c; // On modifie la réponse c de base par la réponse c de l'objet du tableau
    d_text.innerText = currentQuizzData.d; // On modifie la réponse d de base par la réponse d de l'objet du tableau
}

function getSelectedAnswer() {

    let answer = undefined;

    answersElements.forEach(answerElement => {
        if(answerElement.checked) {
            answer = answerElement.id; // retourne l'id de la réponse donnée par le joueur
        }
    });
    return answer;

}

// Création de la fonction de désélection d'une réponse quand on passe à la prochaine
function deselectAnswer() {

    answersElements.forEach(answerElement => {
        if(answerElement.checked) {
            answerElement.checked = false;
        }
    });
}

function doAnswerAnimation() {
    const answer = getSelectedAnswer();
    if (answer) { 
        if (answer === quizzData[currentQuizz].correct) {
            quizzContainerElement.classList.add("validanswer");
        } else {
            quizzContainerElement.classList.add("wronganswer");
        }
    }
}

quizzContainerElement.removeEventListener('animationend', resetAnswerAnimation);


// function validAnswerAnimation() {
//     quizzContainerElement.classList.add("validanswer");
// }

// function wrongAnswerAnimation() {
//     quizzContainerElement.classList.add("wronganswer");
// }

function resetAnswerAnimation() {
    if(quizzContainerElement.classList.contains("validanswer")) {
        quizzContainerElement.classList.remove("validanswer");
    }
    if(quizzContainerElement.classList.contains("wronganswer")) {
        quizzContainerElement.classList.remove("wronganswer");
    }
}

// Ajout de l'événement au click du bouton
submitButton.addEventListener('click', () => {

    const answer = getSelectedAnswer(); // on récupère la valeur de la réponse donnée
    console.log(answer);
    doAnswerAnimation();
    resetAnswerAnimation();


    if (answer) { // Si il donne une réponse, on peut passer à la question suivante
        if (answer === quizzData[currentQuizz].correct) { // si la réponse est juste
            score++; // +1 au score
            quizzContainerElement.classList.add("validanswer");
            // validAnswerAnimation();
        } else {
            // wrongAnswerAnimation();
            quizzContainerElement.classList.add("wronganswer");

        }
        currentQuizz++;// Au final on aura ajouté +1 au currentQuizz pour accéder à la prochaine question
        if(currentQuizz < quizzData.length) { // On vérifie si il reste encore des questions ou non
            resetTimer();
            loadQuizz(); // et on rappelle à chaque fois le loadQuizz pour afficher les questions de l'objet suivant
        } else {
            quizzContainerElement.innerHTML = `<h2> Tu as répondu correctement à ${score} / ${quizzData.length} questions ! </h2> <p id="phrase"></p> <button onclick="location.reload()">Reload</button>`
            const phraseElement = document.getElementById("phrase");
            quizzContainerElement.classList.remove("validanswer");
            quizzContainerElement.classList.remove("wronganswer");
            if(score < 5) {
                phraseElement.innerText="Tu n'as pas assez révisé !"
            } else if(score <= 9) {
                phraseElement.innerText="Beau gosse, c'est pas mal !"
            } else if(score = 10) {
                phraseElement.innerText="Rien à redire, c'est un sans faute !"
            }
        }
    }

})

