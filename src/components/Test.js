import React, { useState } from 'react';
import {
    ChakraProvider,
    theme,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    Container,
    Box
} from '@chakra-ui/react'

async function notifyUser(notificationText = 'Thank you for enabling notifications!') {
    if(!("Notification" in window)) {
        alert("Browser does not support nofitications");
    } else if (Notification.permission === "granted") {
        const notification = new Notification(notificationText);
    } else if (Notification.permission !== 'denied') {
        await Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
               const notification = new Notification(notificationText);
            }
        });
    }
}

function AlertSetup() {
    const [userResponded, setUserResponded] = useState(false);

    async function enableNotifAndClose() {
       await notifyUser().then(() => {
        setUserResponded(true);
       });
    }

    
    function disableNotifAndClose() {
        setUserResponded(true);
    }


      return (!(userResponded) && !(Notification.permission === 'granted')) ? (
        <ChakraProvider theme={theme}>
            <container>
                <Alert status='success'>
                    <AlertIcon />
                    <Box>
                    <AlertTitle>Notifications</AlertTitle>
                    <AlertDescription>
                        Would you like to enable notifications?
                    </AlertDescription>
                    </Box>
                    <Button colorScheme='teal' size={'sm'} onClick={enableNotifAndClose} >
                        Sure!
                    </Button>
                    <Button colorScheme='gray' size={'sm'} onClick={disableNotifAndClose} >
                        No Thanks!
                    </Button>
                </Alert>
            </container>

        </ChakraProvider>
        ) : (Notification.permission === 'granted') ? (
            <ChakraProvider theme={theme}>
              
            </ChakraProvider>
        ) :
        <>
        <h1>You have disabled notifications</h1>
        </>
        ;     
    }