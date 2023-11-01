import React, { useState } from "react";
import Checkbox from "./Checkbox";
import axios from "axios";

export default function Item({_id,itemName,done, onToggle, onErase, onRename }) {
  
  const [edit, setEdit] = useState(false) 
  const [itemNewName, setItemNewName] = useState(itemName) 
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";


console.log(_id)
  const handleDelete = async () => {
    try {await axios.delete(`${API_URL}/task/${_id}`);

      onErase();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleRename = async () => {
    try {
      // await axios.put(`${API_URL}/task/${_id}`, { name: itemNewName });
      onRename(_id,itemNewName);
      setEdit(false);
    } catch (error) {
      console.error("Error renaming item:", error);
    }
  };


  // function updateItemDone(itemId, newDone) {
  //   // Update the item's "done" property on the backend and update the state
  //   fetch(`${API_URL}/api/items/${itemId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ done: newDone }),
  //   })
  //     .then(() =>
  //       setItems((prevItems) =>
  //         prevItems.map((item) =>
  //           item._id === itemId ? { ...item, done: newDone } : item
  //         )
  //       )
  //     )
  //     .catch((error) => console.error('Error updating item:', error));
  // }

  return (
    <div className={`check ${done ? 'done' : 'not-done'}`}>
      <Checkbox checked={done} onClick={() => onToggle(!done)} />
      {!edit && (
        <div className="item-name" onClick={() => setEdit(true)}>
          <span>{itemName}</span>
        </div>
      )}
      {edit && (
        //<form onSubmit={(ev) => { ev.preventDefault(); setEdit(false); }}>
          //<input
            //type="text"
            //value={itemNewName}
            //onChange={(ev) => setItemNewName(ev.target.value)}
          ///>
        //</form>
        <div>
          <input
            type="text"
            value={itemNewName}
            onChange={(ev) => setItemNewName(ev.target.value)}
          />
          <button onClick={handleRename}>Save</button>
        </div>


      )}
      <button className="Erase" onClick={handleDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" /></svg>
      </button>
    </div>
  )
}



