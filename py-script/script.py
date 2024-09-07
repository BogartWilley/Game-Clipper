import cv2
import numpy as np
import pyautogui
import pygetwindow as gw
import sys
import os
from utils.send_action import send_action


# Utility function to get the path for a bundled resource
def resource_path(relative_path):
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except AttributeError:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)


# selected_game = "KOF XIII"
if os.getenv("CURRENT_GAME") is None:
    os.environ["CURRENT_GAME"] = "KOF XIII"


selected_game = os.getenv("CURRENT_GAME")
print("Selected game:", selected_game)

# Base directory for images
games = {
    "KOF XIII": {
        "window_name": "The King Of Fighters XIII",
        "start_image": resource_path("images/KOF_XIII/start-image.png"),
        "stop_images": [
            resource_path("images/KOF_XIII/win-screen-bezel.png"),  
            resource_path("images/KOF_XIII/disconnected-screen.png"),  
            resource_path("images/KOF_XIII/error-screen-1.png"),
            resource_path("images/KOF_XIII/error-screen-2.png")
        ]
    },
    "USF4": {
        "window_name": "Ultra Street Fighter IV",
        "start_image": resource_path("images/USF4/start-image.png"),
        "stop_images": [
            resource_path("images/USF4/win-screen-bezel.png"),
            resource_path("images/USF4/disconnected-screen.png"),
            resource_path("images/USF4/error-screen-1.png"),
            resource_path("images/USF4/error-screen-2.png")
        ]
    },
    "GUILTY GEAR STRIVE": {
        "window_name": "Guilty Gear Strive",
        "start_image": resource_path("images/GUILTY_GEAR_STRIVE/start-image.png"),
        "stop_images": [
            resource_path("images/GUILTY_GEAR_STRIVE/win-screen-bezel.png"),
            resource_path("images/GUILTY_GEAR_STRIVE/disconnected-screen.png"),
            resource_path("images/GUILTY_GEAR_STRIVE/error-screen-1.png"),
            resource_path("images/GUILTY_GEAR_STRIVE/error-screen-2.png")
        ]
    },
    "TEKKEN 8": {
        "window_name": "Tekken 8",
        "start_image": resource_path("images/TEKKEN_8/start-image.png"),
        "stop_images": [
            resource_path("images/TEKKEN_8/win-screen-bezel.png"),
            resource_path("images/TEKKEN_8/disconnected-screen.png"),
            resource_path("images/TEKKEN_8/error-screen-1.png"),
            resource_path("images/TEKKEN_8/error-screen-2.png")
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


