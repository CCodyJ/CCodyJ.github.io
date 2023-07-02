import React, { useState, useEffect, useCallback } from 'react';
//import './App.css';
import Card from './components/Card';

function App() {

//State hook - 'useState'


const [newItem, setNewItem] = useState("");
const [items, setItems] = useState([]);
const [progress, setProgress] = useState(0);


// Callback hook - 'useCallback'

const updateProgress = useCallback(() => {
  const completedItems = items.filter(item => item.completed);
  const progressPercentage =
    items.length > 0 ? (completedItems.length / items.length) * 100 : 0;
  setProgress(Math.round(progressPercentage)); // Round the progress percentage to the nearest whole number
}, [items]);

// Initial progress on load. -'useEffect'

useEffect(() => {
  const completedItems = items.filter(item => item.completed);
  const progressPercentage =
    items.length > 0 ? (completedItems.length / items.length) * 100 : 0;
  setProgress(Math.round(progressPercentage));
}, [items]);


//Storage hook - 'useEffect'


useEffect(() => {
  console.log('Loading items');
  const storedItems = JSON.parse(localStorage.getItem('items'));
  if (storedItems && storedItems.length) {
    setItems(storedItems);
  }
  ;
}, []);

useEffect(() => {
  const storedItems = JSON.stringify(items);
  if (storedItems) {
    localStorage.setItem('items', storedItems);
  }
  console.log('Saving items', storedItems);
  updateProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [items]);


//Helper function


const addItem = () => {
  if (!newItem) {
    alert("Maybe you missed something?")
    return;
  }
  
  const item = {
    id: Math.floor(Math.random() * 1000),
    value: newItem,
    completed: false,
    selectedDateTime: null, 
  };

  setItems(oldList => [...oldList, item]);
  setNewItem("");
  updateProgress();
}

function deleteItem(id) {
  const newArray= items.filter(item => item.id !== id);
  setItems(newArray);
  updateProgress();
}

function deleteAllItems() {
  setItems([]); // Clear all items
  setProgress(0); // Reset progress to 0
}

function markItemCompleted(id) {
  setItems(prevItems =>
    prevItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: true
        };
      }
      return item;
    })
  );


  // Calculate progress percentage based on the updated items list
  const completedItems = items.filter(item => item.completed);
  const progressPercentage =
    items.length > 0 ? (completedItems.length / items.length) * 100 : 0;
  setProgress(Math.round(progressPercentage));
}

const allCompleted = items.length > 0 && items.every(item => item.completed);

// App component rendered on screen as card format

return (
  <Card
      newItem={newItem}
      setNewItem={setNewItem}
      items={items}
      addItem={addItem}
      deleteItem={deleteItem}
      markItemCompleted={markItemCompleted}
      deleteAllItems={deleteAllItems}
      allCompleted={allCompleted}
      progress={progress}
    />
  );
}

export default App;
