'use strict';
function numberGenerator() {
    const correctNumber = Math.round(Math.random() * 20);
    return correctNumber;
}

// Generate the correct number once
let rightAnswer = numberGenerator();
let highscore = 0; // Track the high score


function getValue() {
    // Get the input element
    var input = document.getElementsByClassName("guess")[0];
  
    // Get the value of the input
    var value = input.value;
    return value;
}

let score = 20; // Initialize score here
const button = document.querySelector(".btn.check");

function check() {
    let message = document.querySelector(".message");
    let userAnswer = Number(getValue()); // Convert the input to a number
    document.getElementsByClassName("label-score")[0].innerHTML = `Score: ${score}`;

    // Check if the user input is valid
    if (isNaN(userAnswer)) {
        message.innerHTML = "⛔️ No number!";
    } else if (userAnswer > rightAnswer) {
        message.innerHTML = "📈 Too high!";
        score--; // Decrease the score for an incorrect guess
    } else if (userAnswer < rightAnswer) {
        message.innerHTML = "📉 Too low!";
        score--; // Decrease the score for an incorrect guess
    } else if (userAnswer === rightAnswer) {
        message.innerHTML = "🎉 Correct Number!";
        document.querySelector(".number").innerHTML = rightAnswer;
        document.body.style.backgroundColor = '#60b347';
        button.disabled = true;

        // Update high score if current score is higher
        if (score > highscore) {
            highscore = score;
            document.querySelector(".highscore").textContent = `${highscore}`; // Use textContent to avoid HTML duplication
        }
    }

    // Update the score display
    document.getElementsByClassName("label-score")[0].innerHTML = `${score}`;

    // If score reaches 0, game over
    if (score <= 0) {
        message.innerHTML = "💥 You lost the game!";
        document.getElementsByClassName("label-score")[0].innerHTML = `💯 Score: 0`;
        button.disabled = true; // Disable further guesses
    }
}

function again() {
    const resetButton = document.querySelector(".btn.again");
    resetButton.addEventListener("click", () => {
        // Reset the game state
        score = 20;
        rightAnswer = numberGenerator();
        document.querySelector(".number").innerHTML = '?';
        document.body.style.backgroundColor = '#222';
        document.querySelector(".message").innerHTML = "Start guessing...";
        document.getElementsByClassName("label-score")[0].innerHTML = `💯 Score: ${score}`;
        document.querySelector(".guess").value = ''; // Clear input field
        button.disabled = false; // Re-enable check button
    });
}

// Add event listener to the button once
button.addEventListener("click", check);

// Call the reset function to add event listener
again();
