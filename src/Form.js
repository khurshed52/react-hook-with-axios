import React, { useState, useEffect } from "react";
import "./Form.css";
import { GoGlobe } from "react-icons/go";
import axios from "axios";
const Form = () => {
  const url = "https://jsonplaceholder.typicode.com/";
  const [count, setCount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allEntry, setAllEntry] = useState([]);
  const [notes, getNotes] = useState([]);
  const [image, setImage] = useState(false);

  const show = () => {
    setCount(!count);
  };
  const getImage = ()=> {
      setImage(!image)
  };
  const submit = e => {
    e.preventDefault();
    const newEntry = { name: name, email: email };
    setAllEntry([...allEntry, newEntry]);
    console.log(allEntry);
  };

  const getData = () => {
    axios.get(`${url}photos`).then(res => {
      const allNotes = res.data;
      getNotes(allNotes);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1> this is form </h1>
      <GoGlobe onClick={show} />
      <button onClick={getImage}> Get Data</button>
      {count && (
        <>
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit"> Send </button>
          </form>
        </>
      )}
      <div>
        {allEntry.map((res, i) => {
          return (
            <li key={i}>
              <p> {res.name}</p>
              <p> {res.email}</p>
            </li>
          );
        })}
      </div>
      <div>
      {
        image && (
          <>
            {notes.map((res, i) => {
          return (
            <li key={i}>
              <p> {res.id}</p>
              <img src={res.url} alt={res.title}/>
            </li>
          );
         })}
          </>
        )
      }
       
      </div>
    </div>
  );
};

export default Form;
