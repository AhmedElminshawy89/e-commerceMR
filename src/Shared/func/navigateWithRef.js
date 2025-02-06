// src/utils/navigateWithRef.js
import { useNavigate } from "react-router-dom";

const navigateWithRef = (path) => {
  const navigate = useNavigate();
  const storedRef = localStorage.getItem('ref'); 
  const ref = storedRef ? storedRef : ''; 
  
  navigate(`${path}?ref=${ref}`);
};

export default navigateWithRef;
