import React, { useState } from "react";
import Checkbox from "./Checkbox";


export default function Item({name,done,onToggle, onErase, onRename}) {
    const [edit,setEdit] = useState(false)
    const [itemName, setItemName] = useState(name);
  return(
        <div className={`check ${done ? 'done' : 'not-done'}`}>
        <Checkbox checked={done} onClick= {()=> onToggle(!done)} />
        {!edit && (
        <div className="item-name" onClick={() => setEdit(true)}>
          <span>{name}</span>
        </div>
      )}
      {edit && (
        <form onSubmit={(ev) => { ev.preventDefault(); setEdit(false); }}>
          <input
            type="text"
            value={itemName}
            onChange={(ev) => setItemName(ev.target.value)}
          />
        </form>
      )}
        <button className="Erase" onClick={onErase}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
        </button>
      </div>
    )
}



