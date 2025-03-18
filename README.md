![Electron](https://img.shields.io/badge/Electron-v31.3.0-blue)  ![TypeScript](https://img.shields.io/badge/TypeScript-v5.2.2-blue) ![Python](https://img.shields.io/badge/Python-3.11-blue)  ![OpenCV](https://img.shields.io/badge/OpenCV-4.8.0-green) ![GitHub last commit](https://img.shields.io/github/last-commit/SalimOfShadow/Recca) ![License](https://img.shields.io/github/license/salimofshadow/Recca)  ![Stars](https://img.shields.io/github/stars/SalimOfShadow/Recca?style=social)  
# Recca - by Salim Of Shadow
![3B19ekP.md.png](https://iili.io/3B19ekP.md.png)
## Overview

Recca is designed specifically for gamers who enjoy fighting games and want to effortlessly capture their game replays without the hassle of having to:
- Manually set up OBS and it's corrispondent audio/video sources
- Start and stop a recording during key moments
- Edit/Trim the video to ensure only the essential parts of the matches have been captured
- Upload the file to a video hosting platform
- Store and managing long and often storage-heavy replays

### **Let Recca take care of all that and more for you!**
## Result :

[![3qTKeEl.md.png](https://iili.io/3qTKeEl.md.png)](http://www.youtube.com/watch?v=TSDpWOoLQ2A)

### Features :

- *Automatic OBS Setup/Integration*: <br>Recca is programmed to automatically set up all the necessary OBS audio and video scenes, while ensuring that no other applications or windows are captured.<br> Recca connects to OBS using its provided WebSocket, and it can find the specific game's process and create an OBS scene from it.<br> (**NOTE**: It may resize non-traditional resolutions to 1080p.)

- *OpenCV Template Matching*: <br>Utilizing OpenCV, Recca searches for predefined images matching the selected game's match start/stop screen.<br>The software is smart enough to detect premature match disconnections and crashes; if that's the case, it will simply end the recording prematurely and discard it.

- *Uploads*: <br>Recca gives you the choice of where to upload the replays. It currently supports seamless uploads on *YouTube and Streamable. With both options, the video can be easily embedded in pretty much every major messaging application or social network.

- *Replay Management*: <br>Once a replay is saved and uploaded, the recorded file can optionally be automatically deleted from your PC to save storage space.

## How It Works


1. *Connect to OBS:*<br> Upon opening the program, navigate to the settings tab and follow the **easy* instructions to connect to OBS. 

2.  *Game Selection*:<br> Choose from a list of supported games within the app.<br> Recca will handle the setup and configuration for the selected game on its own.
   
3. *Detection*:<br> The app uses OpenCV's template matching feature to detect when a match starts and ends (either normally or through disconnections/errors).
   
4. *Recording*:<br> After a match has been found on the game window, the program will trigger OBS to start a new recording with the following presets :
 ```json
   {
       "Resolution": "1920 x 1080",
       "Framerate": "60fps",
       "Quality": "Medium Quality" // This assures that a 5ish min replay always average about 300/400 MBs 
   }
   ```
   
5. *Seamless Experience*:<br> Recca aims to not be intrusive at all! Just open the program, specify the game you want to play, and enjoy!

## Possible Future Features

- Upload your own image templates to adjust the replay detection and record whatever game you prefer.
- Detect players names and characters to create custom thumbnails.
