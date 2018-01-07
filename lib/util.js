export const keyboardListeners = (game) => {
  document.addEventListener("keypress", (event) => {
    switch (event.keyCode) {
      case 13:
      game.resetGame();
      break;
      case 32:
      console.log("space bar");
      event.preventDefault();
        if (game.gameOver !== true) {
          if (game.gameState === "pause") {
            game.showTitles = false;
            game.play();
          } else if (game.gameState === "play") {
            game.pause();
          }
        }
        break;
      default:
        break;
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
