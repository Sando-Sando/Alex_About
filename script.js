const memoryData = [
  { pair: "happy", type: "word", value: "Happy" },
  { pair: "happy", type: "image", value: "images/eye-happy.png" },

  { pair: "sad", type: "word", value: "Sad" },
  { pair: "sad", type: "image", value: "images/eye-sad.png" },

  { pair: "angry", type: "word", value: "Angry" },
  { pair: "angry", type: "image", value: "images/eye-angry.png" },

  { pair: "sleepy", type: "word", value: "Sleepy" },
  { pair: "sleepy", type: "image", value: "images/eye-sleepy.png" },

  { pair: "surprised", type: "word", value: "Surprised" },
  { pair: "surprised", type: "image", value: "images/eye-surprised.png" },

  { pair: "curious", type: "word", value: "Curious" },
  { pair: "curious", type: "image", value: "images/eye-curious.png" },

  { pair: "nervous", type: "word", value: "Nervous" },
  { pair: "nervous", type: "image", value: "images/eye-nervous.png" },

  { pair: "calm", type: "word", value: "Calm" },
  { pair: "calm", type: "image", value: "images/eye-calm.png" }
];

const board = document.getElementById("memory-board");
const statusText = document.getElementById("memory-status");
const restartButton = document.getElementById("restart-memory");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createCard(cardData, index) {
  const button = document.createElement("button");
  button.className = "memory-card";
  button.dataset.pair = cardData.pair;
  button.dataset.index = index;
  button.setAttribute("aria-label", "Memory card");

  const inner = document.createElement("div");
  inner.className = "memory-card-inner";

  const front = document.createElement("div");
  front.className = "memory-card-face memory-card-front";
  front.textContent = "?";

  const back = document.createElement("div");
  back.className = "memory-card-face memory-card-back";

  const type = document.createElement("div");
  type.className = "memory-type";
  type.textContent = cardData.type === "word" ? "Emotion" : "Eyes";

  back.appendChild(type);

  if (cardData.type === "word") {
    const value = document.createElement("div");
    value.className = "memory-value";
    value.textContent = cardData.value;
    back.appendChild(value);
  } else {
    const img = document.createElement("img");
    img.className = "memory-eye-image";
    img.src = cardData.value;
    img.alt = `${cardData.pair} eyes`;
    back.appendChild(img);
  }

  inner.appendChild(front);
  inner.appendChild(back);
  button.appendChild(inner);

  button.addEventListener("click", () => handleFlip(button));

  return button;
}

function updateStatus() {
  if (matches === 8) {
    statusText.textContent = `Completed in ${moves} moves`;
  } else {
    statusText.textContent = `Moves: ${moves}`;
  }
}

function handleFlip(card) {
  if (
    lockBoard ||
    card === firstCard ||
    card.classList.contains("matched") ||
    card.classList.contains("flipped")
  ) {
    return;
  }

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  updateStatus();

  const isMatch = firstCard.dataset.pair === secondCard.dataset.pair;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    resetTurn();
    updateStatus();
    return;
  }

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetTurn();
  }, 900);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function initMemoryGame() {
  board.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matches = 0;
  updateStatus();

  const shuffled = shuffle(memoryData);
  shuffled.forEach((item, index) => {
    board.appendChild(createCard(item, index));
  });
}

restartButton.addEventListener("click", initMemoryGame);

initMemoryGame();
