import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  theme,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Box,
  Container
} from '@chakra-ui/react';

export const notifyUser = async (notificationText = 'Thank you for enabling notifications!') => {
  if (!('Notification' in window)) {
    alert('Browser does not support notifications');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== 'denied') {
    await Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        showNotification(notificationText)
      }
    });
  }
};

export const showNotification = (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    console.log('Sending notification:', title, body);
    new Notification(title, {body});
  }
}

const AlertSetup = ({ items, showNotification}) => {
  const [userResponded, setUserResponded] = useState(false);

  const enableNotifAndClose = async () => {
    if (Notification.permission !== 'granted') {
      await notifyUser().then(() => {
        setUserResponded(true);
      });
    }
  };

  const disableNotifAndClose = () => {
    setUserResponded(true);
  };


  useEffect(() => {
    const intervalID = setInterval(() => {
      items.forEach((item) => {
        if (
          item.selectedDateTime &&
          new Date(item.selectedDateTime) - new Date() <= 5 * 60 * 1000
        ) {
          showNotification('Todo Reminder', `Task "${item.value}" is due soon!`);
        }
      });
    }, 60000);
    return () => {
      clearInterval(intervalID);
    };
  }, [items, showNotification]);

  return !userResponded && Notification.permission !== 'granted' ? (
    <ChakraProvider theme={theme}>
      <Container>
        <Alert 
        status="success"
        position="fixed"
        top="10px"
        left="10px"
        width={80}
        >
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>Would you like to enable notifications?</AlertDescription>
          </Box>
          <Box display="flex" mt={2}>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={enableNotifAndClose}
              border="2px solid black"
              flex="1"
              mr={2}
            >
              Sure!
            </Button>
            <Button
              colorScheme="gray"
              size="sm"
              onClick={disableNotifAndClose}
              border="2px solid black"
              flex="1"
            >
              No Thanks!
            </Button>
          </Box>
        </Alert>
      </Container>
    </ChakraProvider>
  ) : Notification.permission === 'granted' ? (
    <ChakraProvider theme={theme}></ChakraProvider>
  ) : (
    <>
      <h4>You have disabled notifications</h4>
    </>
  );
};

export default AlertSetup;
