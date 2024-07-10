const getSceneName = async (obs) => {
  try {
    const currentScene = await obs.call("GetCurrentProgramScene");
    console.log("This is the current selected scene : ");
    console.log(currentScene);
  } catch (err) {
    console.log("Couldn't find the selected scene");
    throw err;
  }
};

const createNewScene = async (obs, game) => {
  let sceneTitle;
  if (game === "KOF XIII") sceneTitle = "The King Of Fighters XIII Replay";
  if (game === "USF4") sceneTitle = "Ultra Street Fighter IV Replay";
  try {
    await obs.call("CreateScene", {
      sceneName: sceneTitle,
    });
    console.log("Scene created successfully, setting it as main :");
    await obs.call("SetCurrentProgramScene", {
      sceneName: sceneTitle,
    });
    console.log("Now calling getSceneName()");
    await getSceneName(obs);
  } catch (error) {
    console.error("Failed to create scene", error.code, error.message);
  }
};
module.exports = {
  getSceneName,
  createNewScene,
};
