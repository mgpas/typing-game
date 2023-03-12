// all of our quotes
const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",

  "I was talking aloud to myself. A habit of the old: they choose the wisest person present to speak to.",
  "I am a servant of the Secret Fire, wielder of the flame of Anor. You cannot pass.The dark fire will not avail you, flame of Udûn. Go back to the Shadow! You cannot pass.",
  "Well, here at last, dear friends, on the shores of the Sea comes the end of our fellowship in Middle-earth. Go in peace!",
  "Do you wish me a good morning, or mean that it is a good morning whether I want it or not, or that you feel good this morning, or that it is a morning to be good on?",
  "Hobbits really are amazing creatures, as I have said before. You can learn all that there is to know about their ways in a month, and yet after a hundred years they can still surprise you at a pinch.",
  "It is not our part here to take thought only for a season, or for a few lives of Men, or for a passing age of the world. We should seek a final end of this menace, even if we do not hope to make one.",
  "Then darkness took me, and I strayed out of thought and time, and I wandered far on roads that I will not tell. Naked I was sent back for a brief time, until my task is done.",
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

document.getElementById("start").addEventListener("click", () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;

  // toggle text input
  typedValueElement.classList.toggle("show");

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Clear any prior messages
  messageElement.innerText = "";

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    messageElement.classList.toggle("show");
    var seconds = elapsedTime / 1000;
    const message = `CONGRATULATIONS! You finished in ${seconds} seconds. In a rate of about ${Math.round(
      seconds / words.length,
    )} seconds per word.`;
    console.log(words.length);
    console.log(seconds);
    messageElement.innerText = message;
    typedValueElement.classList.toggle("hide");
    quoteElement.classList.toggle("hide");
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
  }
});
