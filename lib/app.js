import Game from './game.js';
import soundFX from './sounds';

const settings = {
  muted: true,
  muteButton: document.querySelector("#mute-button")
};

soundFX.menuMusic.muted = true;
soundFX.gameMusic.muted = true;
soundFX.explosion.muted = true;
soundFX.menuMusic.loop = true;
soundFX.gameMusic.currentTime = 11;
soundFX.gameMusic.loop = true;
soundFX.gameMusic.volume = 0.9;
soundFX.menuMusic.play();

settings.muteButton.addEventListener('click', () => {
  settings.muted = !settings.muted;
  if (event.clientX !== 0) {
    soundFX.gameMusic.muted = !soundFX.gameMusic.muted;
    soundFX.menuMusic.muted = !soundFX.menuMusic.muted;
    soundFX.explosion.muted = !soundFX.explosion.muted;
    if (soundFX.gameMusic.muted === true) {
      localStorage.setItem("gameMusic.muted", "true");
    } else {
      localStorage.setItem("gameMusic.muted", "false");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
    window.onload = () => {
      setTimeout(function () {
        game.render();
      }, 150);
    };
});
