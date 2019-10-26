import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => setValue("");

  return {
    input: {
      type,
      value,
      onChange
    },
    reset
  };
};

const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getAll = () => {
      const req = axios.get(baseUrl)
      req.then(res => setResources(res.data))
    }
    getAll()
  }, [baseUrl])

  // let token = null
  // const setToken = newToken => {
  //   token  = `bearer ${newToken}`
  // }

  const create = async (resource) => {
    // const config = {
    //   headers: { Authorization: token }
    // }
    const response = await axios.post(baseUrl, resource)
    const newResource = response.data
    setResources(resources.concat(newResource))
    return newResource
  };

  const service = {
    create
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");
  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = async event => {
    event.preventDefault();
    await noteService.create({
      content: content.input.value
    });
    content.reset();
  };

  const handlePersonSubmit = async event => {
    event.preventDefault();
    await personService.create({
      name: name.input.value,
      number: number.input.value
    });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br />
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
