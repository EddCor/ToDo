import './../App.css';
import './../components/Item';
import './../components/ItemForm';
import { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';
import Item from '../components/Item';
import "../styles/TaskManagerPage.css";



const API_URL = process.env.VITE_API_URL || "http://localhost:5005";



function TaskManagerPage() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("authToken")
  console.log(token)

  const getItems= ()=>{
    fetch(`${API_URL}/task/userTask`, {
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }})
    .then((response) => response.json())
    .then((data) => setItems(data))
    .catch((error) => console.error('Error fetching items:', error));
  }

  useEffect(() => {
    getItems()
}, []);
console.log(items)


  

  function removeItem(itemId) {
    fetch(`${API_URL}/api/items/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => setItems(items.filter((item) => item._id !== itemId)))
      .catch((error) => console.error('Error deleting item:', error));
  }



  // function updateItemDone(itemIndex, newDone) {
  //   setItems((prev) => {
  //     const newItems = [...prev];
  //     newItems[itemIndex].done = newDone;
  //     return newItems;
  //   });
  // }
  function updateItemDone(itemId, newDone) {
    // Update the item's "done" property on the backend and update the state
    fetch(`${API_URL}/taskDone/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ done: newDone }),
    })
      .then(() =>
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, done: newDone } : item
          )
        )
      )
      .catch((error) => console.error('Error updating item:', error));
  }

  
  const numberComplete = items.filter((item) => item.done).length;
  const numberTotal = items.length

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Lest Start ✍🏼'
    }
    if (percentage === 100) {
      return 'You are a Rockstar 🪩'
    }
    return "You're almost  D O N E 🧐 "
  }


  // function renameItem(index, newName) {
  //   const itemsCopy = JSON.parse(JSON.stringify(items))
  //   itemsCopy[index].name = newName
  //   console.log(itemsCopy)
  //   setItems(itemsCopy);
  // }
  // console.log(items[0])

  function renameItem(itemId, newName) {
    const token = localStorage.getItem("authToken")

    fetch(`${API_URL}/task/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    })
    .then((response) => {
      if (response.ok) {
        getItems();
      } else {
        console.error('Error renaming item:', response);
      }
    })
    .catch((error) => console.error('Error updating item:', error));
}


return (
  <main>
    <h1>
      {numberComplete}/{numberTotal} Complete
    </h1>
    <h2> {getMessage()}</h2>
    <ItemForm reload={getItems} />
    {items.map((item) => (
      <Item
        key={item._id}
        {...item}
       _id={item._id} 
        onRename={renameItem}
        onErase={getItems}
        onToggle={()=>updateItemDone(item._id, !item.done)}
      />
    ))}
  </main>
);
}

export default TaskManagerPage;