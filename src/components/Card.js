import React, { useState, useEffect, useCallback } from 'react';
import { Box, Input, Button, ChakraProvider } from '@chakra-ui/react';
import TodoItem from '../TodoItem';
import ProgressBar from '../Progress_bar';
import CompletionMessage from '../CompletionMessage';
import CardStyle from './CardStyle';
import DateTimePicker from '../DateTimePicker';
import { showNotification, requestNotificationPermission } from './DesktopNotification';


const Card = () => {
const [items, setItems] = useState([]);
const [newItem, setNewItem] = useState("");
const [progress, setProgress] = useState(0);
const [selectedDateTime, setSelectedDateTime] = useState(null);

// Notification 

useEffect(() => {
  requestNotificationPermission();
}, []);

useEffect(() => {
  items.forEach((item) => {
    if (
      item.selectedDateTime &&
      new Date(item.selectedDateTime) - new Date() <= 5 * 60 * 1000
    ) {
      showNotification('Todo Reminder', `Task "${item.value}" is due soon!`);
    }
  });
}, [items]);



// Callback hook - 'useCallback'

const updateProgress = useCallback(() => {
  const completedItems = items.filter(item => item.completed);
  const progressPercentage =
  items.length > 0 ? (completedItems.length / items.length) * 100 : 0;
  setProgress(Math.round(progressPercentage)); // Round the progress percentage to the nearest whole number
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

// Initial progress on load. -'useEffect'

useEffect(() => {
  const completedItems = items.filter(item => item.completed);
  const progressPercentage =
    items.length > 0 ? (completedItems.length / items.length) * 100 : 0;
  setProgress(Math.round(progressPercentage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  

  const renderItems = () => {
    return items.map((item) => {
      console.log("Item:", item);
      return (
        <TodoItem
          key={item.id}
          item={item}
          onDelete={deleteItem}
          onMarkCompleted={markItemCompleted}
          selectedDateTime={item.selectedDateTime}
          setSelectedDateTime={(date) => {
          setItems((prevItems) =>
          prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, selectedDateTime: date } : prevItem 
              )
            )
          }}
        />
      );
    });
  };

  const handleAddItem = () => {
    if (!newItem) {
      alert("Maybe you missed something?");
      return;
    }

    const newItemWithDateTime = {
      id: Date.now(),
      value: newItem,
      completed: false,
      selectedDateTime: selectedDateTime,
    };

    setItems(prevItems => [...prevItems, newItemWithDateTime]);
    setNewItem("");
    setSelectedDateTime(null); // Reset the selectedDateTime after adding the item
    updateProgress();
  };

  return (
    <ChakraProvider theme={CardStyle}>
      <Box className='App-container'>
        <Box className="App">
          <h1>Todo List</h1>

          <Input
            type='text'
            placeholder='What do you need to do..?'
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItem();
              }
            }}
          />
          <DateTimePicker
            selected={selectedDateTime}
            onChange={date => setSelectedDateTime(date)}
          />

          <Box as='ul' className='App'>
            {renderItems()}
          </Box>

          {allCompleted && (
            <Button
              className="deleteAllButton"
              onClick={deleteAllItems}
            >
              Delete All
            </Button>
          )}

          <ProgressBar bgcolor="#2196f3" progress={progress} height={20} />

          <CompletionMessage allCompleted={allCompleted} />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Card;
