import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

//State hook - 'useState'
const [newItem, setNewItem] = useState("");
const [items, setItems] = useState([]);

//Storage hook - 'useEffect'
useEffect(() => {
  console.log('Loading items');
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    setItems(JSON.parse(storedItems));
     }
}, []);

  useEffect(() => {
  const storedItems = JSON.stringify(items);
  if (storedItems)
  {localStorage.setItem('items', storedItems)};
  console.log('Saving items', storedItems )
},[items]);

//Helper function
function addItem() {
  if (!newItem) {
    alert("Maybe you missed something?")
    return;
  }
  
  const item = {
    id:Math.floor(Math.random() * 1000),
    value: newItem
  };

  setItems(oldList => [...oldList, item]);

  setNewItem("");
}

function deleteItem(id) {
  const newArray= items.filter(item => item.id !== id);
  setItems(newArray);
}

  return (
    <div className="App">
      {/* 1. Header */}
      <h1>Todo List</h1>

      {/* 2. Input (input and button) */}
      <input
        type='text'
        placeholder='What do you need to do..?'
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      
      <button onClick={() => addItem()}>  
        Add an item!
      </button>

      {/* 3.List of items (unordered list with list items) */}
      <ul className='App'>
        {items.map(item => {
          return (
            <li key={item.id}>{item.value}<button className='deleteButton' onClick={() => deleteItem(item.id)}>&#x274C;</button></li>
            )
        })}
      </ul>
    
    </div>
  );
}

export default App;
