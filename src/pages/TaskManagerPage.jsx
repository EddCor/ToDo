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

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function addItem(name) {
    setItems((prev) => [...prev, { name: name, done: false }]);
  }

  function removeItem(indexToErase) {
    setItems((prev) => prev.filter((_, index) => index !== indexToErase));
  }


  function updateItemDone(itemIndex, newDone) {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[itemIndex].done = newDone;
      return newItems;
    });
  }


  const numberComplete = items.filter(i => i.done).length;
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


  function renameItem(index, newName) {
    const itemsCopy = JSON.parse(JSON.stringify(items))
    itemsCopy[index].name = newName
    console.log(itemsCopy)
    setItems(itemsCopy);
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2> {getMessage()}</h2>
      <ItemForm onAdd={addItem} />
      {items.map((item, index) => (
        <Item
          key={index}
          {...item}
          onRename={(newName) => renameItem(index, newName)}
          onErase={() => removeItem(index)}
          onToggle={(done) => updateItemDone(index, done)}
        />
      ))}
    </main>
  );
}

export default TaskManagerPage;