import cv2
import numpy as np
import pyautogui
import pygetwindow as gw
import sys
import os
from dotenv import load_dotenv
from utils.send_action import send_action

load_dotenv(dotenv_path='../.env')



# selected_game = os.getenv("SELECTED_GAME")
selected_game = "KOF XIII"



print("Selected game:", selected_game)

# Base directory for images
# Update the path to match the actual location of your images
kofxiii_start = "images/test-image.png"
kofxiii_end = "images/win-screen-bezel.png"


def find_match(game, action):
    image = ""
    if game == "KOF XIII":
        if action == "start":
            image = kofxiii_start
        elif action == "stop":
            image = kofxiii_end

    window = gw.getWindowsWithTitle('The King Of Fighters XIII')
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

    img_test = cv2.imread(image)
    img_test = cv2.cvtColor(img_test, cv2.COLOR_RGB2GRAY)

    result = cv2.matchTemplate(img_source, img_test, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    if max_val > 0.89:
        print("Match found at location", max_loc)
        print("This is the max val ", max_val)
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