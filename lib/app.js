import Game from './game.js';
// import {Howl} from 'howler';
import soundFX from './sounds';

const settings = {
  muted: true,
  muteButton: document.querySelector("#mute-button")
};
// menuMusic.muted = true;
// gameMusic.muted = true;
soundFX.explosion.muted = true;

// Howler.mute(settings.muted);
// const gameMusic = new Howl({
//   autoplay: true,
//   loop: true,
//   src: './assets/sounds/space-hiphop-beat1.mp3'
// });

// const menuMusic = new Howl({
//   autoplay: false,
//   loop: true,
//   src: './assets/sounds/clearside-assimilator.mp3'
// });
// menuMusic.play();

settings.muteButton.addEventListener('click', () => {
  settings.muted = !settings.muted;
  // Howler.mute(settings.muted);
});

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
    window.onload = () => {
      game.run();
    };
});
