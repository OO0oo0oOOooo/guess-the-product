let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('guessButton').addEventListener('click', function() {
  const userGuess = parseInt(document.getElementById('guessInput').value);
  attempts++;
  document.getElementById('attempts').textContent = attempts;

  if (userGuess === randomNumber) {
    document.getElementById('feedback').textContent = 'Congratulations! You guessed the number!';
    document.getElementById('feedback').style.color = 'green';
  } else if (userGuess < randomNumber) {
    document.getElementById('feedback').textContent = 'Too low! Try again.';
    document.getElementById('feedback').style.color = 'red';
  } else {
    document.getElementById('feedback').textContent = 'Too high! Try again.';
    document.getElementById('feedback').style.color = 'red';
  }
});
