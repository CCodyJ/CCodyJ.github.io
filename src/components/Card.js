import React, { useState } from 'react';
import { Box, Input, Button, ChakraProvider, VStack, Heading, Progress } from '@chakra-ui/react';
import TodoItem from '../TodoItem';
import ProgressBar from '../Progress_bar';
import CompletionMessage from '../CompletionMessage';
import CardStyle from './CardStyle';
import DateTimePicker from '../DateTimePicker';

const Card = ({
  newItem,
  setNewItem,
  items,
  addItem,
  deleteItem,
  markItemCompleted,
  deleteAllItems,
  allCompleted,
  progress,
  setItems
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

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

    addItem(newItemWithDateTime);
    setNewItem("");
    setSelectedDateTime(null);
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
