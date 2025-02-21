const quizzes = [
    {
        images: ["images/image1.jpg", "images/image2.jpg", "images/image3.jpg"],
        correctImage: 2,
        review: "Hurts too much, I dont understand why these are so popular. Im going back to toilet paper.",
        rating: 2,
    },
    {
        images: ["images/image4.jpg", "images/image5.jpg", "images/image6.jpg"],
        correctImage: 1,
        review: "Grandpa didnt complain.",
        rating: 5,
    },
];

let currentQuiz = 0;
let currentScore = 0;
let highScore = 0;

//const correct = new Audio('Sounds/correct.wav');
//const incorrect = new Audio('Sounds/wrong.wav');

function loadQuiz(quizIndex) {
    const quiz = quizzes[quizIndex];

    modifyScore(currentScore);


    const imageElements = document.querySelectorAll(".image-container img");

    imageElements.forEach(img => img.classList.remove('selected'));
    for (let i = 0; i < 3; i++) {
        imageElements[i].src = quiz.images[i];
        imageElements[i].alt = `Image ${i + 1}`;
    }

    const stars = document.querySelectorAll('.star-container .fa');
    stars.forEach((star, index) => {
        if (index < quiz.rating) {
          star.classList.add('checked'); // Add 'checked' class if index is less than rating
        } else {
          star.classList.remove('checked'); // Remove 'checked' class otherwise
        }
    });

    document.getElementById("review").textContent = quiz.review;
    //enableInput();
}

function selectImage(guessNum) {
    const quiz = quizzes[currentQuiz];

    if (guessNum === quiz.correctImage) {
        currentScore++;

        if(highScore < currentScore)
            highScore = currentScore;

        playSound("Sounds/correct.wav");
    } else {
        currentScore = 0;
        playSound("Sounds/wrong.wav");
    }

    modifyScore(currentScore);
    document.querySelector(`.image-container img:nth-child(${guessNum})`).classList.add('selected');
    
    currentQuiz++;
    currentQuiz = currentQuiz % quizzes.length;

    //disableInput();
    setTimeout(() => loadQuiz(currentQuiz), 500);
}

function modifyScore(msg) {
    document.getElementById("score").textContent = msg;
}

function showMessage(msg) {
    document.getElementById("message").textContent = msg;
}

function disableInput() {
    const images = document.querySelectorAll('.image-container img');
    images.forEach(img => {
        img.removeEventListener('click', () => selectImage);
    });
}

function enableInput() {
    const images = document.querySelectorAll('.image-container img');
    images.forEach((img, index) => {
        img.addEventListener('click', () => selectImage(index + 1));
    });
}

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.volume = 0.25;
    audio.play();
}

loadQuiz(currentQuiz);