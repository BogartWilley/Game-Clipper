import cv2
import numpy as np
import pyautogui
import pygetwindow as gw
import sys
import time
import requests
import os
from dotenv import load_dotenv
load_dotenv(dotenv_path='../.env')

run = True

kofxiii_start = "images/win-screen-bezel.png"
kofxiii_end = "images/win-screen-bezel.png"

def find_match(image) :
    global run
    global selectedGame
    game_env_var = os.getenv("SELECTED_GAME")
    print(game_env_var)
    run = False
    return 
# Get the window coordinates
    window = gw.getWindowsWithTitle('The King Of Fighters XIII') 
    if not (window):
        print("Couldn't find the game's instances...Is it running?")
        sys.exit()
    window = window[0] # Accounts for multiple istances of the same game running
    # Get the x and y coordinates of the window
    x = window.left
    y = window.top

    # Get the width and height of the window
    w = window.width
    h = window.height

    # Capture the screenshot using pyautogui
    screenshot = pyautogui.screenshot(region=(x, y, w, h))


    img_source = np.array(screenshot)
    img_source = cv2.cvtColor(img_source, cv2.COLOR_BGR2GRAY)
    img_source = cv2.resize(img_source, (2560, 1440))


    # img_test = cv2.imread('images/win-screen-bezel.png')
    img_test = cv2.imread(image)
    img_test = cv2.cvtColor(img_test, cv2.COLOR_RGB2GRAY)

    result = cv2.matchTemplate(img_source,img_test, cv2.TM_CCOEFF_NORMED)

    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    w = img_test.shape[1]
    h = img_test.shape[0]
    if max_val > 0.89:
        print("Match found at location", max_loc)
        print("This is the max val ", max_val)
        # requests.get("http://localhost:3000/start-recording")
        sendAction("start","KOF XIII")
        cv2.rectangle(img_source, max_loc, (max_loc[0] + w , max_loc[1] + h ), (122,255,255), 5 )
        run = False
        cv2.imshow("Result",img_source)
        cv2.imwrite("result.png", img_source)
        cv2.waitKey()
        cv2.destroyAllWindows()
        sys.exit()
    else:
        print("No match found", max_val)
        
def sendAction(action,game):
    url = f"http://localhost:4609/{action}-recording"
    headers = {
        "game": game
    }
    response = requests.get(url, headers=headers)
    return response

while (run == True):
    find_match("selectedGame")