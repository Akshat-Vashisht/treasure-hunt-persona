import React from "react";
import Chest from "../Components/Chest";

const GameQues = () => {
  const questions = [
    {
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ad1",
      id: 1,
    },
    { question: "Lorem  amet consectetur adipisicing elit. Nulla, ad2", id: 2 },
    { question: "Lorem ipsum dolor sit amet  elit. Nulla, ad3", id: 3 },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing Nulla, ad4",
      id: 4,
    },
    { question: "Lorem ipsum dolor sit adipisicing elit. Nulla, ad5", id: 5 },
  ];

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="flex flex-wrap">
        {questions.map((item) => {
          return <Chest data={item} />;
        })}
      </div>
    </div>
  );
};

export default GameQues;
