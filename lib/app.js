import Game from './game.js';
import {Howl} from 'howler';

let highScore = localStorage.getItem("highScore") || 0;

const settings = {
  muted: true,
  muteButton: document.querySelector("#mute-button")
};
//sounds
var chopperSound = new Audio('assets/sounds/helicopter.mp3');
var explosionSFX = new Audio('assets/sounds/explosion.flac');
explosionSFX.defaultMuted = true;
menuMusic.muted = true;
gameMusic.muted = true;
explosionSFX.muted = true;
let muteCheck = true;

Howler.mute(settings.muted);
const gameMusic = new Howl({
  autoplay: true,
  loop: true,
  src: './assets/sounds/space-hiphop-beat1.mp3'
});

const menuMusic = new Howl({
  autoplay: false,
  loop: true,
  src: './assets/sounds/clearside-assimilator.mp3'
});
menuMusic.play();

settings.muteButton.addEventListener('click', () => {
  settings.muted = !settings.muted;
  Howler.mute(settings.muted);
});

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
    window.onload = () => {
      game.run();
    };
});
