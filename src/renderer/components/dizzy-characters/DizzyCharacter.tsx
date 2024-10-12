import React from 'react';
import './dizzy-characters.css';

// Images imports
import dizzyAshGif from './dizzy-characters-images/dizzy-ash.gif';
import dizzyAthenaGif from './dizzy-characters-images/dizzy-athena.gif';
import dizzyBenimaruGif from './dizzy-characters-images/dizzy-benimaru.gif';
import dizzyIoriGif from './dizzy-characters-images/dizzy-iori.gif';
import dizzyKyoGif from './dizzy-characters-images/dizzy-kyo.gif';
import dizzySaikiGif from './dizzy-characters-images/dizzy-saiki.gif';

const imageList: Array<string> = [
  dizzyAshGif,
  dizzyAthenaGif,
  dizzyBenimaruGif,
  dizzyIoriGif,
  dizzyKyoGif,
  dizzySaikiGif,
];

export default function DizzyCharacter(props: any) {
  // Function to get a random image from the list
  function getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
  }

  return (
    <div>
      <img
        className="dizzy-character"
        src={getRandomImage()}
        alt="Dizzy Character"
        onClick={() => {
          console.log(getRandomImage());
        }}
      />
    </div>
  );
}
