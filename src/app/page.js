
"use client";
import axios from "axios";
import {useState} from "react";
export default function Home() {

  const { answer, setAnswer } = useState("")
  const{ isloading, setIsloading} = useState(false)


   async function note(event){
    event.preventDefault();
    setIsloading(true);

    const character = event.target.name.value;
    const animal = event.target.age.value;
    const style = event.target.topic.value;

    const response = await axios.post("/api/create-image", {
      character,
      animal,
      style
    });

    console.log(response.data)
    setAnswer(response.data.answer)
    setIsloading(false);

   }
  return ( 
    <div>
    <form onSubmit={note} className="flex flex-col">
        <input className="border-slate-500" type ="text"  name="character" placeholder="character" ></input>
        <input className="border-slate-500" type ="textr"  name="animal"  placeholder="animal"></input>
        <input className="border-slate-500" type ="text"  maxLength={20} name="style"  placeholder="style"></input>
        <button type="submit" disable={isloading}>{isloading ? 'Loading' : 'Submit'}</button>
  </form>
  <p className="p-4">{isloading ? 'Loading...':''}</p>
  <p className="p-4">{answer}</p>
  {answer && <img src={answer} className="w-full" alt ="AI generated image" />}
  </div>
  );
  
}
