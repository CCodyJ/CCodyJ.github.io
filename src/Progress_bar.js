import React from 'react';
import { Progress, Text, Box } from '@chakra-ui/react';

const ProgressBar = ({ progress, height, colorScheme }) => {
  return (
    <Box style={{ position: 'relative' }}>
      <Progress
        value={progress}
        height={'15px'}
        borderRadius={40}
        colorScheme={colorScheme}
      />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontWeight="bold"
      >
        {`${progress}%`}
      </Text>
    </Box>
  );
};

export default ProgressBar;
