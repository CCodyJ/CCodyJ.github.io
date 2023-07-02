import { extendTheme } from "@chakra-ui/react";

const CardStyle = extendTheme({
  styles: {
    global: {
      ".App": {
        textAlign: "center",
      },
      ".App-container": {
        margin: "auto",
        width: "400px",
        display: "flex",
        justifyContent: "center",
        border: "1px solid black",
        padding: "20px",
        marginTop: "50px",
        backgroundColor: "white",
        boxShadow: "0px 3px 9px rgb(54, 91, 255)",
        borderRadius: "3px",
      },
      "input": {
        padding: "4px",
        marginRight: "8px",
      },
      "h1": {
        fontSize: "42px",
        fontStyle: "italic",
        textDecoration: "underline",
        color: "rgb(0, 0, 0)",
      },
      "ul": {
        listStyle: "none",
        padding: "0",
      },
      "li": {
        margin: "12px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
      },
      ".TodoItem": {
        border: "none",
        backgroundColor: "rgb(247, 255, 138)",
        boxShadow: "0 3px 4px rgb(243, 226, 144)",
        borderRadius: "3px",
      },
      ".message": {
        fontSize: "24px",
        color: "white",
        fontStyle: "italic",
        background: "linear-gradient(to right, #ff0000, #00ff00)",
      },
      ".action-buttons": {
        display: "inline-flex",
        gap: "8px",
      },
      ".action-buttons span": {
        cursor: "pointer",
      },
      ".deleteButton, .completeButton": {
        fontSize: "14px",
        marginLeft: "8px",
        border: "none",
        color: "rgb(15, 183, 0)",
        borderRadius: "4px",
        paddingTop: "4px",
        paddingBottom: "4px",
        boxShadow: "0 2.8px 4px rgba(0, 0, 0, 0.2)",
      },
      ".deleteButton": {
        color: "red",
      },
      "li.TodoItem.completed": {
        backgroundColor: "rgb(128, 255, 128)",
      },
    },
  },
});

export default CardStyle;
