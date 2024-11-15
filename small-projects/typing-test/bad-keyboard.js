let KEYBOARD = {}
const LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const textArea = document.querySelector('textarea');

document.addEventListener('DOMContentLoaded', e => {
    KEYBOARD = loadKeyboard();
    console.log(KEYBOARD)
})

textArea.addEventListener('keydown', e => {
    const lowerKey = e.key.toLowerCase()
    const isUpper = !(e.key == lowerKey);
    const isLetter = ( e.key.toUpperCase() != e.key.toLowerCase() );
    if (LETTERS.includes(lowerKey)) {
        e.preventDefault();
        e.stopPropagation();

        let newLetter = KEYBOARD[lowerKey];
        if (isUpper) {
            newLetter = KEYBOARD[lowerKey].toUpperCase();
        }
        textArea.value += newLetter;
    }
})

function loadKeyboard() {
    let shuffled = LETTERS
        .map(value => ({ value, sort: Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map(({ value }) => value);
    let keyboardDict = Object.fromEntries(LETTERS.map((letter, index) => [letter, shuffled[index]]));
    return keyboardDict;
}


// function shuffle(array) {
//     let currentIndex = array.length;
  
//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {
  
//       // Pick a remaining element...
//       let randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }
//   }
 
//   let shuffled = LETTERS
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
   
// console.log(shuffled)
// console.log(LETTERS)
  
//   // Used like so
//   let arr = [2, 11, 37, 42];
//   shuffle(arr);
//   console.log(arr);