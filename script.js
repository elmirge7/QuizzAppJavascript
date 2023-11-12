const quizzData = [
    {
        question: 'qui a crée node js ?',
        a: 'apagnan',
        b: 'quoicoubeh',
        c: 'apagné',
        d: 'johan bitardo',
        correct: 'd'
    },
    {
        question: 'quel pokemon est de type feu ?',
        a: 'pikachu',
        b: 'qulbutoké',
        c: 'dracaufeu',
        d: 'noam joly girods',
        correct: 'c'
    },
    {
        question: 'Elvir est il gentil ?',
        a: 'oui',
        b: 'non',
        c: 'peut etre',
        d: 'a toi de dire la question',
        correct: 'd'
    },
    {
        question: 'quel est le meilleur jeu du monde ?',
        a: 'war thunder',
        b: 'super smash bros ultimate',
        c: 'hearts of iron IV',
        d: 'fortniti',
        correct: 'b'
    },
    {
        question: 'qui ?',
        a: 'kirikou',
        b: 'quiqui et grominet',
        c: 'quick attack',
        d: 'lababaje',
        correct: 'a'
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
let timer = 10;

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
    timer = 10;
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

// Ajout de l'événement au click du bouton
submitButton.addEventListener('click', () => {

    const answer = getSelectedAnswer(); // on récupère la valeur de la réponse donnée
    console.log(answer);


    if (answer) { // Si il donne une réponse, on peut passer à la question suivante
        if (answer === quizzData[currentQuizz].correct) { // si la réponse est juste
            score++; // +1 au score
        }
        currentQuizz++;// Au final on aura ajouté +1 au currentQuizz pour accéder à la prochaine question
        if(currentQuizz < quizzData.length) { // On vérifie si il reste encore des questions ou non
            loadQuizz(); // et on rappelle à chaque fois le loadQuizz pour afficher les questions de l'objet suivant
        } else {
            quizzContainerElement.innerHTML = `<h2> Tu as répondu correctement à ${score} / ${quizzData.length} questions ! </h2> <button onclick="location.reload()">Reload</button>`
        }
    }

})

