import cv2
import numpy as np
import pyautogui
import pygetwindow as gw
import sys
import os
from dotenv import load_dotenv
from utils.send_action import send_action

load_dotenv(dotenv_path='../.env')



# selected_game = os.getenv("CURRENT_GAME")
selected_game = "KOF XIII"



print("Selected game:", selected_game)

# Base directory for images


# Update the path to match the actual location of your images
kofxiii_start = "images/test-image.png"
kofxiii_end = "images/win-screen-bezel.png"
games = {
    "KOF XIII": {
        "window_name": "The King Of Fighters XIII",
        "start_image": "images/KOF_XIII/test-image.png",
        "stop_images": [
            "images/KOF_XIII/win-screen-bezel.png",  
            "images/KOF_XIII/disconnected-screen.png",  
            "images/KOF_XIII/error-screen-1.png",
            "images/KOF_XIII/error-screen-2.png"  
        ]
    },
    "USF4": {
        "window_name": "Ultra Street Fighter IV",
        "start_image": "images/USF4/start-image.png",
        "stop_images": [
            "images/USF4/win-screen-bezel.png",  
            "images/USF4//disconnect-screen.png", 
            "images/USF4/error-screen1.png",  
            "images/USF4/error-screen2.png" 
        ]
    },
    "GUILTY GEAR STRIVE": {
        "window_name": "Guilty Gear Strive",
        "start_image": "images/GUILTY_GEAR_STRIVE/start-image.png",
        "stop_images": [
            "images/GUILTY_GEAR_STRIVE/win-screen-bezel.png",  
            "images/GUILTY_GEAR_STRIVE/disconnect-screen.png", 
            "images/GUILTY_GEAR_STRIVE/error-screen1.png",  
            "images/GUILTY_GEAR_STRIVE/error-screen2.png" 
        ]    
    },
    "TEKKEN 8": {
        "window_name": "Tekken 8",
        "start_image": "images/TEKKEN_8/start-image.png",
        "stop_images": [
            "images/TEKKEN_8/win-screen-bezel.png",  
            "images/TEKKEN_8/disconnect-screen.png", 
            "images/TEKKEN_8/error-screen1.png",  
            "images/TEKKEN_8/error-screen2.png" 
        ]
    }
}


def find_match(game, action):
    game_object = games[game]
    images = []
    if action == "start":
        images = [game_object["start_image"]]
    elif action == "stop":
            images = game_object["stop_images"]

    window = gw.getWindowsWithTitle(game_object["window_name"])
    if not window:
        print("Couldn't find the game's instances...Is it running?")
        sys.exit()
    window = window[0]

    x = window.left
    y = window.top
    w = window.width
    h = window.height

    screenshot = pyautogui.screenshot(region=(x, y, w, h))
    img_source = np.array(screenshot)
    img_source = cv2.cvtColor(img_source, cv2.COLOR_BGR2GRAY)
    img_source = cv2.resize(img_source, (2560, 1440))

    for image in images:

        img_test = cv2.imread(image)
        img_test = cv2.cvtColor(img_test, cv2.COLOR_RGB2GRAY)

        result = cv2.matchTemplate(img_source, img_test, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

        if max_val > 0.89:
            print("Match found at location", max_loc)
            print("This is the max val ", max_val)
            print(f"This was the image : {image}")
            send_action(selected_game, action)

            w = img_test.shape[1]
            h = img_test.shape[0]
            return True
    else:
        print("No match found", max_val)
        return False

state = "start"

while True:
    if state == "start":
        if find_match(selected_game, "start"):
            print("Now searching for the ending image")
            state = "end"
    elif state == "end":
        if find_match(selected_game, "stop"):
            state = "start"