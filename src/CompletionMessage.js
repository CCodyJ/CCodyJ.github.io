import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const CompletionMessage = ({ allCompleted }) => {
    return (
        <Box className='CompletionMessage'>
          {allCompleted && (
            <Text className='message'>
              Hey you did it!! Great job!!{' '}
              <span role="img" aria-label="Party Steamer">
                {'\uD83C\uDF89'}
              </span>
            </Text>
          )}
        </Box>
      );
    };
    

export default CompletionMessage;