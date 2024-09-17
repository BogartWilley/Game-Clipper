import psutil
import gwindows as gw

# Desired window title and executable name
window_title = "The King Of Fighters XIII"
exe_name = "kofxiii.exe"  # replace with actual executable name

# Fetch windows matching the title
windows = gw.getWindowsWithTitle(window_title)

# Function to get the process name of a window
def get_process_name(window):
    try:
        pid = window._hWnd  # Get window handle
        for proc in psutil.process_iter(['pid', 'name']):
            if proc.info['pid'] == pid:
                return proc.info['name']
    except Exception as e:
        print(f"Error getting process name: {e}")
    return None

# Filter windows to get the correct one by process name
for window in windows:
    process_name = get_process_name(window)
    if process_name and process_name.lower() == exe_name.lower():
        print(f"Found game window: {window}")
        # Do something with the game window
        break
else:
    print("Game window not found!")