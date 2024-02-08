import React, { useState } from "react";

const Chest = ({ data, openModal, setOpenModal, index, currentChestId }) => {
  const [openChest, setOpenChest] = useState(false);

  function onChestClick(data) {
    if (index === currentChestId) {
      if (!data.isOpen) {
        const openChestAudio = new Audio("./assets/sounds/questionAppear.mp3");
        openChestAudio.play();
        setOpenModal({
          status: true,
          data: data,
        });
      }
    }
  }

  function onOpenChest() {
    // if (!openChest) {
    const openChestAudio = new Audio("./assets/sounds/openChest.mp3");
    openChestAudio.play();
    setOpenChest(true);
    // }
  }
  return (
    <div
      key={data.id}
      className="h-[8rem] user-select-none flex flex-col items-center z-20"
    >
      <img
        draggable={false}
        onClick={() => onChestClick(data)}
        className={`w-[7rem] transition-all duration-200 cursor-pointer mx-auto ${index === currentChestId ? "glow" : ""} ${
          data.isOpen ? "chest-image" : ""
        }`}
        src={`./assets/${data.isOpen ? "open" : "close"}Chest.png`}
        alt="chest"
      />
      <span className="text-white text-xs">Crate {index}</span>
    </div>
  );
};

export default Chest;
