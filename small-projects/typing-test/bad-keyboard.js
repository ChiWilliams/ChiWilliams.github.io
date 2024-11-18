let KEYBOARD = {}
const LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const textArea = document.querySelector('textarea');
let TIMERSTARTED = false;
let FINISHED = false;
const GOAL = document.getElementById("goal-string").textContent;

document.addEventListener('DOMContentLoaded', e => {
    KEYBOARD = loadKeyboard();
    textArea.value = "";
    console.log(KEYBOARD)
});

textArea.addEventListener('keydown', async e => {
    //start the timer
    if (!TIMERSTARTED) {
        runTimer();
        TIMERSTARTED = true;
    }

    const lowerKey = e.key.toLowerCase()
    const isUpper = !(e.key == lowerKey);
    if (LETTERS.includes(lowerKey)) {
        e.preventDefault();
        e.stopPropagation();

        //transform to new key:
        let newLetter = KEYBOARD[lowerKey];
        if (isUpper) {
            newLetter = KEYBOARD[lowerKey].toUpperCase();
        }

        // Update the textarea value manually
        const cursorPosition = textArea.selectionStart;
        const textBefore = textArea.value.slice(0, cursorPosition);
        const textAfter = textArea.value.slice(cursorPosition);
        textArea.value = textBefore + newLetter + textAfter;
        // Set the cursor position correctly
        textArea.selectionStart = textArea.selectionEnd = cursorPosition + 1;
        console.log("adding letter finished")
    }
});

//it wouldn't be fun if the user can just paste their input
//so being evil, we prevent them from doing so ...
addEventListener("paste", (e) => {
    e.preventDefault();
});

//check for win condition
textArea.addEventListener("input", (event) => {
    if (textArea.value == GOAL) {
        gameWon();
    }
  });

//loading the keyboard in a shuffled manner
function loadKeyboard() {
    let shuffled = LETTERS
        .map(value => ({ value, sort: Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map(({ value }) => value);
    let keyboardDict = Object.fromEntries(LETTERS.map((letter, index) => [letter, shuffled[index]]));
    return keyboardDict;
}

async function runTimer() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const timer = document.getElementById("timer")
    let secs = 0;
    while (!FINISHED) {
        await delay(1000);
        secs += 1;
        timer.innerHTML = `<b>Timer:</b> ${secs}`;
    }
    
}

function gameWon() {
    // stop the timer
    FINISHED = true;
    //make textARea disabled
    textArea.disabled = true;
    //show a message:
    document.getElementById("you-won").style.display = "block";

}