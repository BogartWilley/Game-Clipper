import obsws_python as obs

# pass conn info if not in config.toml
cl = obs.ReqClient(host='localhost', port=4455, password='mystrongpass', timeout=3)

# Toggle the mute state of your Mic input
cl.create_scene("The King Of Fighters XIII Replay")
cl.set_video_settings(base_width=1920,base_height=1080)
cl.toggle_input_mute('Mic/Aux')


