import React, { useEffect, useState } from "react";
import Chest from "../Components/Chest";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";

const GameQues = ({chestOpened, setChestOpened}) => {
  const [openModal, setOpenModal] = useState({
    status: false,
    data: {},
  });
  // const [chestOpened, setChestOpened] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentChestId, setCurrentChestId] = useState(1); // current Id - the chest which should be open now!
  const [isWrongAnswer, setisWrongAnswer] = useState(false);
  async function fetchAllQuestions() {
    try {
      const res = await axios.get("http://15.206.164.121:5000//questions");
      if (res.status == 200) {
        console.log(res);
        setChestOpened(
          res.data.map((item) => {
            return { ...item, isOpen: false, answer: "",clickable:false };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  function closeModal() {
    setOpenModal({
      status: false,
      data: {},
    });
    setAnswer("");
    setisWrongAnswer(false);
  }
  async function checkQuestion(data) {
    //todo input check empty
    try {
      const res = await axios.post("http://15.206.164.121:5000//game", {
        qId: data.id,
        userAnswer: answer,
      });
      if (res.status === 200) {
        console.log(res);
        setChestOpened((prevChests) =>
          prevChests.map((item) =>
            item.id === data.id ? { ...item, isOpen: res.data.success } : item
          )
        );
        setisWrongAnswer(!res.data.success);
        if (res.data.success) {
          setCurrentChestId(prev=>++prev)
          const openChestAudio = new Audio("./assets/sounds/openChest.mp3");
          openChestAudio.play();
          closeModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(chestOpened);
    console.log(openModal);
  }, [chestOpened]);

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <>
      <div className="py-8">
        <div className="h-fit mx-auto grid grid-cols-3 gap-4 gap-y-8 mt-8">
          {chestOpened.map((item, index) => {
            return (
              <Chest
                key={item.id}
                index={index + 1}
                data={item}
                currentChestId={currentChestId}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            );
          })}
        </div>
      </div>
      {openModal.status && (
        <div className="fixed user-select-none top-0 right-0 z-40 h-screen reveal w-full bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="p-4 py-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-[80vw] h-fit rounded-md">
            <RxCross2
              onClick={closeModal}
              className="absolute top-1 -right-4 bg-black text-white rounded-full border border-white text-xl float-right m-2 cursor-pointer"
            />
            <div className="flex flex-col gap-10">
              <p className="text-[#639FB1] first-letter:text-2xl">
                {openModal.data.question}
              </p>
              <div>
              <input
                placeholder="Type your answer"
                type="text"
                value={answer}
                onChange={(event) =>{ setAnswer(event.target.value); setisWrongAnswer(false)}}
                className={`bg-transparent text-slate-100 border ${
                  isWrongAnswer ? "border-red-500 text-red-500" : "border-white"
                }  py-1 px-2 w-full rounded-md focus:outline-none`}
              />
              {isWrongAnswer && <span className="text-xs text-red-500">Wrong answer!</span>}
              </div>
              <button
                onClick={() => checkQuestion(openModal.data)}
                className="text-slate-100 flex w-fit items-center gap-x-2 mx-auto"
              >
                Unlock Crate <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameQues;
