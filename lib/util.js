export const keyboardListeners = (game, chopper) => {

  document.addEventListener("keypress", (event) => {
    switch (event.keyCode) {
      case (event.keyCode === 32) && (game.gameOver !== true):
        if (game.gameState === "pause") {
          game.play();
        } else if (game.gameState === "play") {
          game.pause();
        }
        break;
      case 82:
        location.reload();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 70) {
      chopper.flying = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.keyCode === 70) {
      chopper.flying = false;
    }
  });
};

export const formatScore = (score) => {
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
};
