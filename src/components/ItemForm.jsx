import { useState } from "react";
import axios from "axios";




const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function ItemForm({ reload }) {


  
  const [itemName, setItemName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit= async(ev) => {
    ev.preventDefault();
   
    setItemName('')
   
    
    const payload = {itemName};
    let token = localStorage.getItem("authToken");
   

    try {
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);       
        setItemName("");
        reload ();
      }
    } catch (error) {
      console.log(error);
    }

  };



  
  
  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input id= "taskInput"type="text"
        value={itemName}
        onChange={ev => setItemName(ev.target.value)}
        placeholder="Next item"
      />
    </form>

  );
}


