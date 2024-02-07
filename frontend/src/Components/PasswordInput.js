import React, { useState, useRef, useEffect } from 'react';

const PasswordInput = ({password, setPassword, handleChange, inputRefs}) => {
//   const [password, setPassword] = useState(Array(length).fill(''));
//   const inputRefs = useRef([]);

//   const handleChange = (index, value) => {
//     const newPassword = [...password];
//     newPassword[index] = value;
//     setPassword(newPassword);
//     if (value && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

  const handleKeyUp = (index, e) => {
    if (e.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    console.log(password)
  }, [password])
  

  return (
    <div className="flex items-center justify-center">
      {password.map((char, index) => (
        <input
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          type="password"
          maxLength={1}
          className="w-10 h-10 mx-1 text-center  bg-transparent text-white border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          value={char}
          onChange={e => handleChange(index, e.target.value)}
          onKeyUp={e => handleKeyUp(index, e)}
        />
      ))}
    </div>
  );
};

export default PasswordInput;
