import './../App.css';
import './../components/Item';
import './../components/ItemForm';
import { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';
import Item from '../components/Item';
import "../styles/TaskManagerPage.css";



const API_URL = "http://localhost:5005";

function TaskManagerPage() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("authToken")
  const getItems= ()=>{
    fetch(`${API_URL}/task/userTask`, {headers: {
      'Content-Type': 'application/json',Authorization: `Bearer ${token}`
    }})
    .then((response) => response.json())
    .then((data) => setItems(data))
    .catch((error) => console.error('Error fetching items:', error));
  }

  useEffect(() => {
    getItems()
}, []);
console.log(items)

  //   const storedItems = JSON.parse(localStorage.getItem('items'));
  //   if (storedItems) {
  //     setItems(storedItems);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (items.length === 0) return;
  //   localStorage.setItem('items', JSON.stringify(items));
  // }, [items]);

  // function addItem(name) {
  //   setItems((prev) => [...prev, { name: name, done: false }]);
  // }




  // function removeItem(indexToErase) {
  //   setItems((prev) => prev.filter((_, index) => index !== indexToErase));
  // }


  function removeItem(itemId) {
    // Delete the item on the backend and update the state
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
    fetch(`${API_URL}/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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

  // const numberComplete = items.filter(i => i.done).length;
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
    // Update the item's name on the backend and update the state
    fetch(`${API_URL}/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    })
      .then(() =>
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, name: newName } : item
          )
        )
      )
      .catch((error) => console.error('Error renaming item:', error));
  }



//   return (
//     <main>
//       <h1>{numberComplete}/{numberTotal} Complete</h1>
//       <h2> {getMessage()}</h2>
//       <ItemForm onAdd={addItem} />
//       {items.map((item, index) => (
//         <Item
//           key={index}
//           {...item}
//           onRename={(newName) => renameItem(index, newName)}
//           onErase={() => removeItem(index)}
//           onToggle={(done) => updateItemDone(index, done)}
//         />
//       ))}
//     </main>
//   );
// }


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
        onRename={(newName) => renameItem(item._id, newName)}
        onErase={getItems}
        onToggle={(done) => updateItemDone(item._id, done)}
      />
    ))}
  </main>
);
}

export default TaskManagerPage;