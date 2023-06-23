import React from 'react';

const CompletionMessage = ({ allCompleted }) => {
    return (
        <div className='CompletionMessage'>
          {allCompleted && (
            <p className='message'>
              Hey you did it!! Great job!!{' '}
              <span role="img" aria-label="Party Steamer">
                {'\uD83C\uDF89'}
              </span>
            </p>
          )}
        </div>
      );
    };
    

export default CompletionMessage;