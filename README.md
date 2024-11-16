# Game Replay Capture App (WIP) - by Salim Of Shadow

## Overview

This Electron application is designed specifically for gamers who want to effortlessly capture their game replays without the hassle of manually starting and stopping recordings,or having very lenghty clips stored in their PC. 
(Once the project is finished and the app deployed, it'll upload each replay directly either on Streamable or on Youtube) 

## Features

- **Automatic Replay Capture**: Seamlessly capture your gameplay without needing to manually start or stop recordings.
  
- **OpenCV Template Matching**: Utilizes OpenCV for matching images on the captured window and take actions accordingly.
  
- **OBS Integration**: Uses OBS WebSocket (ws) to precisely find and capture video and audio from the game window only, ensuring that no other applications or windows are recorded.All audio sources not related to the game itself are automatically muted to ensure a clean recording.
  
- **Replay Management**: Once a replay is saved and uploaded, the recorded file can optionally be automatically deleted from your PC to save up storage space.

## How It Works

1. **Game Selection**: Choose from a list of supported games within the app. The program will handle the setup and configuration for the selected game on it's own.
   
2. **Detection**: The app uses OpenCV template matching to detect when a match starts and ends (either normally or through disconnections/errors).
   
3. **Recording**: It communicates with OBS via WebSocket to start and stop recording based on the detected match times.
   
4. **Seamless Experience**: Enjoy uninterrupted recording of your game sessions with minimal setup.

## - POSSIBLE FUTURE FEATURES -

- **Upload your own image templates to adjust the replay detection and record whataver game you prefer.**
- **Signup on your own YouTube channel using OAuth,and manage your replays from there (CURRENTLY LIMITED BY THE API QUOTA)**
- **Detect players name and characters,to create custom thumbnails**
