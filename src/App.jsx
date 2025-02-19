import { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom'; 
import Routing from "./Router/Routing";
import OfflineNotice from "./Shared/func/OfflineNotice";

const App = () => {
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    const handleKeyDown = (event) => {
      if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const detectDevTools = () => {
      const devtools = new Function("debugger");
      try {
        devtools();
      } catch (error) {
        window.location.href = "about:blank";
        console.log(error)
      }
    };

    const interval = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener("contextmenu", (event) => event.preventDefault());
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);
  return (
    <Router> 
      <OfflineNotice/>
      <Routing />
    </Router>
  );
};

export default App;
