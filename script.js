// Select DOM elements
const gameArea = document.getElementById('gameArea');
const basket = document.querySelector('.basket');
const scoreDisplay = document.querySelector('.score');

// Initialize game variables
let score = 0;
let basketX = window.innerWidth / 2 - 10; // Starting position for the basket
let gameInterval;

// Set initial basket position
basket.style.left = `${basketX}px`;

// Handle basket movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') basketX -= 20;
  if (e.key === 'ArrowRight') basketX += 20;

  // Prevent basket from leaving the game area
  basketX = Math.max(0, Math.min(window.innerWidth - 100, basketX));
  basket.style.left = `${basketX}px`;
});

// Function to create a falling object
function createObject() {
  const obj = document.createElement('div');
  obj.className = 'object';
  obj.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
  obj.style.top = '0px';
  gameArea.appendChild(obj);
  return obj;
}

// Start the game
function startGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  
  gameInterval = setInterval(() => {
    const obj = createObject();
    let objY = 0;

    // Handle object falling
    const fallInterval = setInterval(() => {
      objY += 5;
      obj.style.top = `${objY}px`;

      // Get bounding boxes for collision detection
      const objRect = obj.getBoundingClientRect();
      const basketRect = basket.getBoundingClientRect();

      // Check for collision
      if (
        objRect.bottom >= basketRect.top &&
        objRect.left < basketRect.right &&
        objRect.right > basketRect.left
      ) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        obj.remove();
        clearInterval(fallInterval);
      }

      // Check if the object reaches the bottom of the screen
      if (objY > window.innerHeight) {
        obj.remove();
        clearInterval(fallInterval);
        clearInterval(gameInterval);
        alert('Game Over!');
      }
    }, 50);
  }, 1000);
}

// Start the game when the script loads
startGame();
