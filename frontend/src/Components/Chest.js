import React, { useState } from "react";

const Chest = ({ data, openModal, setOpenModal, index, key }) => {
  const [openChest, setOpenChest] = useState(false);
  function onChestClick() {
    setOpenModal({
      status: true,
      data: data,
    });
  }
  function onOpenChest() {
    if (!openChest) {
      const openChestAudio = new Audio("./assets/sounds/openChest.mp3");
      openChestAudio.play();
      setOpenChest(true);
    }
  }
  return (
    <div key={key} className="h-[8rem] flex flex-col items-center z-20">
      <img
        onClick={() => onChestClick(data)}
        className={`w-[7rem] transition-all duration-200 cursor-pointer mx-auto ${
          openChest ? "chest-image" : ""
        }`}
        src={`./assets/${openChest ? "open" : "close"}Chest.png`}
        alt="chest"
      />
      <span className="text-white text-xs">Crate {index}</span>
    </div>
  );
};

export default Chest;
