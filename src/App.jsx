import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const passwordRef = useRef();
  
  console.log(length);
  
  const generatePassword = () => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isCharacterAllowed){
      str += "+=!@#$%^&*"
    }

    if(isNumberAllowed){
      str += "0123456789"
    }

    for(let i=1; i<=length; i++){
      let randomIndex = Math.floor(Math.random() * str.length)
      let characterPicked = str.charAt(randomIndex)
      pass += characterPicked
    }
    setPassword(pass);

    console.log(pass);
  }

  useEffect(()=>{
    generatePassword();
  },[length, isNumberAllowed, isCharacterAllowed])


  const copyPasswordToClipBoard = () => {
    navigator.clipboard.writeText(password)
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, 100);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-20 text-3xl">
      <h1 className="font-bold">Password Generator</h1>

      {/* Password Input */}
      <input
        type="text"
        placeholder="Enter password..."
        value={password}
        ref={passwordRef}
        className="px-7 py-3 w-200 !bg-gray-200 !text-black border-0 outline-0 rounded-lg"
      />

      {/* Password Range */}
      <input
        type="range"
        min={0}
        max={100}
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="px-7 py-4 w-200 !bg-gray-200 !text-black border-0 outline-0 rounded-lg cursor-pointer"
      />

      {/* Checkboxes for Number Allowed and Character Allowed */}
      <label htmlFor="NumberAllowed">
            <input id="NumberAllowed" type="checkbox" checked={isNumberAllowed} className="cursor-pointer" onChange={(e)=>setIsNumberAllowed(e.target.checked)}/>
            Number Allowed
      </label>

      <label htmlFor="CharacterAllowed">
          <input id="CharacterAllowed" type="checkbox" checked={isCharacterAllowed} className="cursor-pointer" onChange={(e)=>setIsCharacterAllowed(e.target.checked)}/>
          Character Allowed
      </label>

      {/* Copy Password */}
      <button className="!bg-blue-400 py-3 px-7 !text-black rounded-lg w-200 font-medium cursor-pointer" onClick={copyPasswordToClipBoard}>
        Copy Password
      </button>
      
      {/* Save Password */}
      <button className="!bg-blue-400 py-3 px-7 !text-black rounded-lg w-200 font-medium cursor-pointer" onClick={()=>setSavedPasswords([...savedPasswords, password])}>
        Save Password
      </button>

        {/* Reset Password */}
      <button className="!bg-blue-400 py-3 px-7 !text-black rounded-lg w-200 font-medium cursor-pointer" onClick={(e)=>{
        setLength(8);
        setIsNumberAllowed(false);
        setIsCharacterAllowed(false);
      }}>
        Reset Password
      </button>

        {
          savedPasswords.map((item, index)=>(
            <p key={`${item}-${index}`}>{item}</p>
          ))
        }

    </div>
  );
};

export default App;
