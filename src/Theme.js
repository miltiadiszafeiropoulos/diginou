import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";

// Define your themes
const themes = {
  light: {
    xroma: 'light',
      header: {
        background: "white",
        color: 'black',
        activelink: {
          background: "rgba(0, 157, 224, 0.08)",
          color: "rgb(0, 157, 224)",  
        },
      },
      main: {
        background: "rgb(251,251,251)",
        color: 'black',
      },
      card: {
        background: "white",
        color: 'black',
        hover: 'rgb(220,220,220)',// complete order card hover
        price: '#009de0'
      },
      button: {
        background: "#009de0",
        color: 'white',
        iconsplusminus: {
          background: "white",
          color: "black",
        },
        trash: {
          color: "white",
        },
        counter: {
          background: "white",
          color: "black",
        }
      },
      footer:{
        background: "white",
        color: 'black',
        hover: 'rgb(0, 157, 224)'
      },
      sidebar:{
        background: "#c1c1c1",
        color: "#f1f1f1",
        button: "#c1c1c1",
        border: "#424242",
        hover: "#999999"
      }
  },
  dark: {
    xroma: 'dark',
    header: {
      background: "#242526",
      color: "white",
      activelink: {
        background: "rgba(0, 157, 224, 0.08)",
        color: "rgb(0, 157, 224)",  
      },
    },
    main: {
      background: "#18191a",
      color: "white"
    },
    card: {
      background: "#242526",
      color: "white",
      hover: 'rgb(020,020,020)',// complete order card hover
      price: '#009de0',
    },
    button: {
      background: "#009de0",
      color: "black",
      iconsplusminus: {
        background: "white",
        color: "black",
      },
      trash: {
        color: "black",
      },
      counter: {
        background: "white",
        color: "black",
      }
    },
    footer:{
      background: "#242526",
      color: 'white',
      hover: 'rgb(0, 157, 224)'
    },
    sidebar:{
      background: "#686868",
      color: "#424242",
      button: "#686868",
      border: "white",
      hover: "#222222"
    }
  },
};

export const Theme = ({ children }) => {
  // Retrieve the theme from local storage on component mount
  const storedTheme = localStorage.getItem("theme");
  // Set the initial theme to the stored theme or default to "light"
  const [currentTheme, setCurrentTheme] = useState(storedTheme || "light");

  // Function to toggle between light and dark themes
  const handleToggleTheme = () => {
    // Determine the new theme based on the current theme
    const newTheme = currentTheme === "light" ? "dark" : "light";
    // Set the new theme
    setCurrentTheme(newTheme);
    // Save the selected theme to local storage
    localStorage.setItem("theme", newTheme);
  };

  // Add a useEffect hook to set the theme based on local storage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    // If a theme is stored, set the current theme accordingly
    if (storedTheme) {
      setCurrentTheme(storedTheme);
    }
  }, []); // Empty dependency array ensures this effect runs only on mount

  return (
    // Provide the current theme and toggle function to the styled-components ThemeProvider
    <ThemeProvider theme={{ ...themes[currentTheme], toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;