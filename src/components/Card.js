import React from 'react';
import { Box, Input, Button, ChakraProvider } from '@chakra-ui/react';
import TodoItem from '../TodoItem';
import ProgressBar from '../Progress_bar';
import CompletionMessage from '../CompletionMessage';
import CardStyle from './CardStyle';

const Card = ({ newItem, setNewItem, items, addItem, deleteItem, markItemCompleted, deleteAllItems, allCompleted, progress }) => {
  return (
    <ChakraProvider theme={CardStyle}>
      <Box className='App-container'>
        <Box className="App">
          {/* 1. Header */}
          <h1>Todo List</h1>

          {/* 2. Input (input and button) */}
          <Input
            type='text'
            placeholder='What do you need to do..?'
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                addItem();
              }
            }}
          />

          <Box as='ul' className='App'>
            {items.map(item => (
              <TodoItem
                key={item.id}
                item={item}
                onDelete={deleteItem}
                onMarkCompleted={markItemCompleted}
              />
            ))}
          </Box>

          {/* Delete All button */}
          {allCompleted && (
            <Button 
              className="deleteAllButton" 
              onClick={deleteAllItems}
            >
              Delete All
            </Button>
          )}

          {/* Progress bar */}
          <ProgressBar bgcolor="#2196f3" progress={progress} height={20} />

          {/* Completion message */}
          <CompletionMessage allCompleted={allCompleted} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Card;
