let human_choice; // stores the current weapon selected by the player ("Rock", "Paper", or "Scissor")

// randomly picks a choice for the computer using equal one-third probability
function random_number_selector() {
    let randomNum = Math.random(); // generates a decimal number between 0 (inclusive) and 1 (exclusive)

    if (randomNum >= 0 && randomNum < 0.33) {
        return "Rock";
    }
    else if (randomNum >= 0.33 && randomNum < 0.66) {
        return "Paper";
    }
    else {
        return "Scissor";
    }
}

// score tracking variables
let computer_score = 0; // tracks rounds won by the computer
let human_score = 0;    // tracks rounds won by the player

// cache DOM elements so we do not have to search the document repeatedly
let live_score_text = document.querySelector(".live-score-text");
let you_score_number = document.querySelector(".you-score-number");
let computer_score_number = document.querySelector(".computer-score-number");

// evaluates player vs computer choice, announces the round outcome, and increments score
function play_game() {
    let computer_choice = random_number_selector();
    
    // check for tie when both choose the same option
    if (human_choice === computer_choice) {
        live_score_text.innerHTML = `<span class="draw">Draw!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
    }

    // player chooses Rock: loses to Paper, beats Scissor
    else if (human_choice === "Rock") {
        if (computer_choice === "Paper") {
            live_score_text.innerHTML = `<span class="comp-won">Computer Won!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
            computer_score += 1;
            computer_score_number.textContent = `${computer_score}`;
        }
        else if (computer_choice === "Scissor") {
            live_score_text.innerHTML = `<span class="you-won">You Won!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
            human_score += 1;
            you_score_number.textContent = `${human_score}`;
        }
    }

    // player chooses Paper: loses to Scissor, beats Rock
    else if (human_choice === "Paper") {
        if (computer_choice === "Scissor") {
            live_score_text.innerHTML = `<span class="comp-won">Computer Won!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
            computer_score += 1;
            computer_score_number.textContent = `${computer_score}`;
        }
        else if (computer_choice === "Rock") {
            live_score_text.innerHTML = `<span class="you-won">You Won!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
            human_score += 1;
            you_score_number.textContent = `${human_score}`;
        }
    }

    // player chooses Scissor: loses to Rock, beats Paper
    else if (human_choice === "Scissor") {
        if (computer_choice === "Rock") {
            live_score_text.innerHTML = `<span class="comp-won">Computer Won!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
            computer_score += 1;
            computer_score_number.textContent = `${computer_score}`;
        }
        else if (computer_choice === "Paper") {
            live_score_text.innerHTML = `<span class="you-won">You Won!!</span> , You chose ${human_choice} and Computer chose ${computer_choice}`;
            human_score += 1;
            you_score_number.textContent = `${human_score}`;
        }
    }
}

// resets both scores to zero and restores the initial status message
function game_reset() {
    human_score = 0;
    you_score_number.textContent = `${human_score}`;
    computer_score = 0;
    computer_score_number.textContent = `${computer_score}`;
    live_score_text.textContent = "Start !!!";
}

// displays total match results in an alert box and resets the board for a new game
function final_score() {
    alert(`Final Score:
        You: ${human_score}
        Computer: ${computer_score}`);
    game_reset();
}
