import React, { useState } from "react";


const Chest = () => {
  const [openChest, setOpenChest] = useState(false);

  function onChestClick() {
    const openChestAudio = new Audio("./assets/sounds/chestOpen.mp3");
    openChestAudio.play();
    setOpenChest(true);
  }
  return (

    <div>
      <img
        onClick={onChestClick}
        className={`w-[10rem] transition-all duration-200 cursor-pointer ${
          openChest ? "chest-image" : ""
        }`}
        src={`./assets/${openChest ? "open" : "close"}Chest.png`}
        alt="chest"
      />
    </div>
  );
};

export default Chest;
