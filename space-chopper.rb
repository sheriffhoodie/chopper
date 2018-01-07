

  //sounds
  var chopperSound = new Audio('sounds/helicopter.mp3');
  var menuMusic = new Audio('https://s3.us-east-2.amazonaws.com/chopper-dev/sounds/clearside-assimilator.wav');
  menuMusic.loop = true;
  var gameMusic = new Audio('sounds/space-hiphop-beat1.mp3');
  gameMusic.currentTime = 11;
  gameMusic.loop = true;
  gameMusic.volume = 0.8;
  var explosionSFX = new Audio('sounds/explosion.flac');
  explosionSFX.defaultMuted = true;
  let muteButton = document.querySelector("#mute-button");
  menuMusic.muted = true;
  gameMusic.muted = true;
  explosionSFX.muted = true;
  let muteCheck = true;
  muteButton.addEventListener('click', () => {
    if (event.clientX !== 0) {
      muteCheck = !muteCheck;
      gameMusic.muted = !gameMusic.muted;
      menuMusic.muted = !menuMusic.muted;
      explosionSFX.muted = !explosionSFX.muted;
      if (gameMusic.muted === true) {
        localStorage.setItem("gameMusic.muted", "true");
      } else {
        localStorage.setItem("gameMusic.muted", "false");
      }
    }
  });
