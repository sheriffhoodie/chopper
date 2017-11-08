(see formatted version with wireframe image in the wiki)

## Background

The Helicopter Game is a classic arcade game for 1 Player involving keeping a constantly falling and forward-progressing helicopter hovering through gaps in oncoming walls that appear in various heights and placements. The player simply uses the mouse to engage the hover: clicking and holding down will cause the helicopter to rise while lightly tapping at regular intervals will keep it hovering at the same altitude and letting it go will cause the helicopter to lose altitude.

There is no "end" to the game, your distance is tracked as you fly forward and is given to you as your score when you (eventually) crash the helicopter.

## Functionality & MVP

In my Helicopter game, users will be able to:

* start, pause, and reset the game screen
* fully control the altitude of the helicopter as described above with the mouse and guide it through the maze
* see their distance score updating in real time, and presented to them at the end

There will also be:
* an about modal describing game objective and controls
* a production ReadMe

## Architecture and Technologies (TBD)

The game will use vanilla Javascript with HTML, CSS, and Canvas for rendering.

The main entry file will hold all logic for gameplay, leaving the canvas structure and styling to separate HTML and CSS files.

## Wireframes
![wireframe](https://github.com/sheriffhoodie/helicopter/blob/master/images/New_JS_mockup.png)


## Implementation Timeline

Day 1: Set up all 3 files with proper skeletons, research logic for "runner" game, research implementation of Canvas with Javascript and create an example if possible. Begin writing out HTML structure and most fundamental game logic with possible methods and helper methods.

Day 2: Render basic Canvas with basic elements in place. Finish most of game logic. For start screen, add links to Linkedin, GitHub, and portfolio. Also add modal with instructions.

Day 3: Complete Game Logic. Render the game screen with tunnel element, "helicopter" piece, and live updating score with final score displayed at the end. Run tests and continue styling to make as presentable as possible for user.

## Bonus Features:

* Save high scores to a database with a username, display top 5 high scores before game start and after game end.
* Create different difficulty modes (easy and hard) that the user can choose from before play.
* Add music, with option for muting before, during, and after game play
