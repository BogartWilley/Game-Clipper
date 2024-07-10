const KOF = {
  name: "KOF XIII",
  fullName: "The King Of Fighters XIII",
  windowId:
    "The King of Fighters XIII:F9D96469-6208-4609-AA55-1192042585C3:kofxiii.exe",
};
const USFIV = {
  name: "USFIV",
  fullName: "Ultra Street Fighter IV",
  windowId: "foobar",
};

const audioSetup = async (obs, game) => {
  const selectedGame = game === KOF || game === USFIV ? game : null;
  try {
    // Replace 'kofxiii.exe' and 'The King Of Fighters XIII' with your actual values
    const audio = await obs.call("CreateInput", {
      sceneName: `${selectedGame.fullName} Replay`,
      inputName: `${selectedGame.name} Audio Capture`,
      inputKind: "wasapi_process_output_capture",
      inputSettings: {
        window: selectedGame.windowId,
      },
      sceneItemEnabled: true,
    });
    console.log(audio);
  } catch (err) {
    console.log(err);
  }
};
const videoSetup = async (obs, game) => {
  const selectedGame = game === KOF || game === USFIV ? game : null;
  try {
    const video = await obs.call("CreateInput", {
      sceneName: `${selectedGame.fullName} Replay`,
      inputName: `${selectedGame.name} Video Capture`,
      inputKind: "game_capture",
      inputSettings: {
        capture_mode: "window",
        window: selectedGame.windowId, // TODO - find USFIV's one
        window_match_priority: true,
        window_priority: 0,
      },
      sceneItemEnabled: true,
    });

    console.log(video);
  } catch (error) {
    console.error("Error creating game capture input:", error);
  }
};

//  ---------- TESTING FUNCTIONS ----------
const logSettings = async (obs, type) => {
  if (type === "video") {
    const video = await obs.call("GetInputSettings", {
      inputName: "KOF XIII Video Capture",
    });
    console.log(video);
    return;
  }
  if (type === "audio") {
    const audio = await obs.call("GetInputSettings", {
      inputName: "KOF XIII Audio Capture",
    });
    console.log(audio);
  }
};

module.exports = { audioSetup, videoSetup, logSettings };
