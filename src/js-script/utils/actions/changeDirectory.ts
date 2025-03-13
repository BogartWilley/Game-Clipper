import { obs } from '../connection/connect';

export async function changeDirectory() {
  try {
    const newDirectoryPath = process.env.REPLAY_DIRECTORY;
    const currentDirectoryPath = await obs.call('GetProfileParameter', {
      parameterCategory: 'SimpleOutput',
      parameterName: 'FilePath',
    });
    const changeDirectoryPath = await obs.call('SetProfileParameter', {
      parameterCategory: 'SimpleOutput',
      parameterName: 'FilePath',
      parameterValue: currentDirectoryPath.defaultParameterValue,
    });
    setTimeout(() => {
      console.log(currentDirectoryPath);
    }, 2000);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
