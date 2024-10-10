import React from 'react';
import './dizzy-characters.css';

// Images imports
import dizzyKyoGif from './dizzy-characters-images/dizzy-kyo.gif';
import dizzyIoriGif from './dizzy-characters-images/dizzy-iori.gif';
const imageList: Array<string> = [dizzyKyoGif, dizzyIoriGif];

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
