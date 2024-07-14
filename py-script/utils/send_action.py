import requests
def send_action(game,action):
    url = f"http://localhost:4609/{action}-recording"
    headers = {
        "game": game
    }
    response = requests.get(url, headers=headers)
    return response