//play/pause with spacebar
document.addEventListener("keypress", (event) => {
  if ((event.keyCode === 32) && (gameOver !== true)) {
    if (gameState === "pause") {
      play();
    } else if (gameState === "play") {
      pause();
    }
  }
  event.preventDefault();
});

document.addEventListener("keypress", (event) => {
  if (event.key === "r") {
    location.reload();
  }
  // event.preventDefault();
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 70) {
    flying = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 70) {
    flying = false;
  }
});

function increaseScore() {
  endTime = Date.now();
  elapsedTime = endTime - startTime;
  score = Math.floor((endTime - startTime - pauseTotal) / 400);
}

function formatScore () {
  if (score > 99999) {
    return '99999';
  } else if (score > 9999) {
    return score;
  } else if (score > 999) {
    return '0' + score;
  } else if (score > 99) {
    return '00' + score;
  } else if (score > 9) {
    return '000' + score;
  } else {
    return '0000' + score;
  }
}

function formatHighScore () {
  if (highScore > 99999) {
    return '99999';
  } else if (highScore > 9999) {
    return highScore;
  } else if (highScore > 999) {
    return '0' + highScore;
  } else if (highScore > 99) {
    return '00' + highScore;
  } else if (highScore > 9) {
    return '000' + highScore;
  } else {
    return '0000' + highScore;
  }
}
