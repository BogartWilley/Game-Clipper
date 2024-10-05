import requests
def send_action(game,action):
    try:
        url = f"http://localhost:4609/{action}-recording"
        headers = {
            "game": game,
            "disconnected": "false"
        }
        response = requests.get(url, headers=headers)
        return response 
    except: print("Encountered an error while sending the request") 