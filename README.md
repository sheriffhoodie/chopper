## Background

[Live Link!](https://sheriffhoodie.github.io/space-chopper/)

Space Chopper is a 2D side-scrolling spinoff version of the classic Helicopter arcade game for 1 Player involving keeping a constantly falling helicopter hovering and dodging oncoming obstacles that appear randomly. The player simply uses the "F" key to engage the flight: pressing and holding down will cause the helicopter to steadily ascend while lightly tapping at regular intervals will keep it hovering at the same altitude and letting it go will cause the helicopter to lose altitude.

There is no "end" to the game, your distance is tracked as you fly forward and is given to you as your score when you crash the chopper into an obstacle or the top or bottom edges of the screen.

## Functionality & MVP

In the game, users will be able to:

* start, pause, and reset the game screen
* fully control the altitude of the helicopter as described above and guide it through the maze of floating obstacles
* see their distance score updating in real time, and presented to them at the end


## Architecture and Technologies (TBD)

The game will use vanilla Javascript with HTML, CSS, and Canvas for rendering with the SoundManager2 Library for sound effects and background music.

The main entry file will hold all logic for gameplay, leaving the canvas structure and styling to separate HTML and CSS files.

## Bonus Features:

* Save high scores to a database with a username, display top 5 high scores before game start and after game end.
* Create different difficulty modes (easy and hard) that the user can choose from before play.
* Add music, with option for muting before, during, and after game play
