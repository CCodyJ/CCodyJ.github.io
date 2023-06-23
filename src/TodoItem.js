import React from 'react';

function TodoItem({ item, onDelete, onMarkCompleted }) {
  const handleDelete = () => {
    onDelete(item.id);
  };

  const handleMarkCompleted = () => {
    onMarkCompleted(item.id);
  };

  if (item.id === 'deleteAll') {
    return null; // Render nothing for the deleteAll item
  }

  return (
    <li className={`TodoItem ${item.completed ? 'completed' : ''}`}>
      <span>{item.value}</span>
      <div className="action-buttons">
        <button className="deleteButton" onClick={handleDelete}>
          &#10006;
        </button>
        {!item.completed && (
          <button className="completeButton" onClick={handleMarkCompleted}>
            &#10004;
          </button>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
