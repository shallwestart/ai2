
"use client";
import axios from "axios"
export default function Home() {


   async function note(event){
    event.preventDefault();

    const name = event.target.name.value;
    const age = event.target.age.value;
    const topic = event.target.topic.value;

    const response = axios.post("/api/create-story", {
    name,
    age,
    topic
    })

    console.log(response.data.answer)

   }
  return ( 
    <form onSubmit={note} className="flex flex-col">
        <input className="border-slate-500" type ="text"  name="name" placeholder="กรอกชื่อ" ></input>
        <input className="border-slate-500" type ="number"  name="age"  placeholder="อายุ"></input>
        <input className="border-slate-500" type ="text"  maxLength={20} name="topic"  placeholder="กรอกหัวข้อ"></input>
        <button type="submit">Send</button>
  </form>
  );
}
