# Game Replay Capture App

## Overview

This Electron application is designed specifically for gamers who want to effortlessly capture their game replays without the hassle of manually starting and stopping recordings,or having very lenghty clips. 
(Once the project is finished and the app deployed, it'll upload each replay either on my VPS or directly to Youtube). 

## Features

- **Automatic Replay Capture**: Seamlessly capture your gameplay without needing to manually start or stop recordings.
  
- **OpenCV Template Matching**: Utilizes OpenCV for matching images on the captured window and take actions accordingly.
  
- **OBS Integration**: Uses OBS WebSocket (ws) to precisely find and capture video and audio from the game window only, ensuring that no other applications or windows are recorded.
  
- **Replay Management**: Once a replay is saved and uploaded to either the VPS or YouTube,the recorded file can optionally be delete from your PC to save storage space.

## How It Works

1. **Game Selection**: Choose from a list of supported games within the app. The program will handle the setup and configuration for the selected game.
   
2. **Detection**: The app uses OpenCV template matching to detect when a match starts and ends.
   
3. **Recording**: It communicates with OBS via WebSocket to start and stop recording based on the detected match times.
   
4. **Seamless Experience**: Enjoy uninterrupted recording of your game sessions with minimal setup.
