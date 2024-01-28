import React, { useEffect, useState } from "react";
import Chest from "../Components/Chest";
import { RxCross2 } from "react-icons/rx";
const GameQues = () => {
  const [openModal, setOpenModal] = useState({
    status: false,
    data: {},
  });
  const questions = [
    {
      id: 1,
      question:
        "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
      answer: "an echo",
    },
    {
      id: 2,
      question: "The more you take, the more you leave behind. What am I?",
      answer: "footsteps",
    },
    {
      id: 3,
      question: "What has keys but can't open locks?",
      answer: "a piano",
    },
    {
      id: 4,
      question:
        "The person who makes it, sells it. The person who buys it never uses it. What is it?",
      answer: "a coffin",
    },
    {
      id: 5,
      question:
        "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answer: "the letter 'm'",
    },
    {
      id: 6,
      question:
        "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
      answer: "pencil lead/graphite",
    },
    {
      id: 7,
      question:
        "The more you look at me, the more you see. But the longer you stare, the less there is to see. What am I?",
      answer: "darkness",
    },
    {
      id: 8,
      question:
        "I fly without wings. I cry without eyes. Wherever I go, darkness follows me. What am I?",
      answer: "a cloud",
    },
  ];
  function closeModal() {
    setOpenModal({
      status: false,
      data: {},
    });
  }
  useEffect(() => {
    console.log(openModal);
  }, [openModal]);

  return (
    <>
      {" "}
      <div className="py-8">
        <div className="h-fit mx-auto grid grid-cols-3 gap-4 gap-y-8 mt-8">
          {questions.map((item, index) => {
            return (
              <Chest
                index={index+1}
                key={item.id}
                data={item}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            );
          })}
        </div>
      </div>
      {openModal.status && (
        <div className="fixed top-0 right-0 z-40 h-screen reveal w-full bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-[80vw] h-[50%] rounded-md">
            <RxCross2
              onClick={closeModal}
              className="text-white rounded-full border border-white text-xl float-right m-2 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GameQues;
