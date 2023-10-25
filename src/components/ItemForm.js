import {useState} from "react";


export default function ItemForm ({onAdd}) {
const[itemName, setItemName]= useState('');
function handleSubmit(ev){
ev.preventDefault();
onAdd(itemName);
setItemName('')
}
return(
    <form onSubmit={handleSubmit}>
    <button>+</button>
    <input type="text"
    value={itemName}
    onChange={ev => setItemName(ev.target.value)}
    placeholder= "Next item"
     />
  </form>

);
}


