let dogScore = 0;
let catScore = 0;

// Event listener for the "Start the game" button
document.getElementById("nappi").addEventListener("click", resetGame);

// Event listeners for dog and cat images
document.getElementById("kuva1").addEventListener("click", () => {
  dogScore++;
  updateScores();

  if (dogScore === 5) {
    declareWinner("Dogs");
  } else {
    haeKuvat();
  }
});

document.getElementById("kuva2").addEventListener("click", () => {
  catScore++;
  updateScores();

  if (catScore === 5) {
    declareWinner("Cats");
  } else {
    haeKuvat();
  }
});

function updateScores() {
  // Update the scores in the results section
  const dogScoreElement = document.querySelector("#dog-score");
  const catScoreElement = document.querySelector("#cat-score");

  dogScoreElement.textContent = `Dog: ${dogScore}`;
  catScoreElement.textContent = `Cat: ${catScore}`;
}

function declareWinner(winner) {
  // Display the winner in the results section
  const resultElement = document.querySelector(".results");
  resultElement.innerHTML = `<h3>${winner} win!</h3>`;

  // Reset the scores after a brief delay
  setTimeout(() => {
    dogScore = 0;
    catScore = 0;
    updateScores();
    // Fetch initial images
    haeKuvat();
    // Revert the results section to its initial state
    resultElement.innerHTML = `
      <h3>Results</h3>
      <p id="dog-score">Dog: 0</p>
      <p id="cat-score">Cat: 0</p>
    `;
  }, 30); // Reset scores after 0.3 seconds
}

async function haeKuvat() {
  var dogOsoite = "https://dog.ceo/api/breeds/image/random";
  var catOsoite = "https://cataas.com/cat";

  var dogResponse = await fetch(dogOsoite);
  var catResponse = await fetch(catOsoite);

  if (dogResponse.ok && catResponse.ok) {
    var dogData = await dogResponse.json();
    var catData = await catResponse.blob(); // Fetch cat image as a blob

    // Convert the cat image blob into a data URL
    const catImageUrl = URL.createObjectURL(catData);

    document.getElementById("kuva1").setAttribute("src", dogData.message);
    document.getElementById("kuva2").setAttribute("src", catImageUrl); // Set the cat image source
  } else {
    console.error("Failed to fetch images.");
  }
}

// Reset the game function
function resetGame() {
  // Fetch initial images
  haeKuvat();
  // Reset scores to 0
  dogScore = 0;
  catScore = 0;
  // Revert the results section to its initial state
  const resultElement = document.querySelector(".results");
  resultElement.innerHTML = `
    <h3>Results</h3>
    <p id="dog-score">Dog: 0</p>
    <p id="cat-score">Cat: 0</p>
  `;
}

// Initialize the scores on page load
updateScores();
