import React, {useState,useEffect} from 'react';

import './App.css';
import axios from "axios";

function App() {

  const [projectList,setProjectList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/api/projects')
      .then(res=>{
        console.log(res.data);
        setProjectList(res.data);
      })
      .catch(error=>{
        console.log(error);
      })

  },[])


  return (
    <div className="App">
      {projectList.map((item)=>(
        <div className="project">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
