import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { MdDelete, MdCheck } from "react-icons/md";



function TodoItem({
  item,
  onDelete,
  onMarkCompleted,
  selectedDateTime,

}) {

  console.log("Selected DateTime:", selectedDateTime);
  const handleDelete = () => {
    onDelete(item.id);
  };

  const handleMarkCompleted = () => {
    onMarkCompleted(item.id);
  };

  if (item.id === "deleteAll") {
    return null; // Render nothing for the deleteAll item
  }

  
  return (
    <Box
      as="li"
      className={`TodoItem ${item.completed ? "completed" : ""}`}
      display="flex"
      alignItems="center"
    >
      <Box flex="1" px="4" py="2">
        {item.value}
      </Box>
      <Box>{selectedDateTime && selectedDateTime.toString()}</Box>
        <IconButton
        aria-label="Delete"
        icon={<MdDelete />}
        onClick={handleDelete}
      />
      {!item.completed && (
        <IconButton
          aria-label="Complete"
          icon={<MdCheck />}
          onClick={handleMarkCompleted}
        />
      )}
    </Box>
  );
}

export default TodoItem;
