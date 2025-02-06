/* eslint-disable react/prop-types */

import { MdOutlineElectricBolt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const TitleSection = ({title , secTitle,to}) => {
  const navigate = useNavigate();
  const navigateWithRef = (path) => {
    const storedRef = localStorage.getItem('ref'); 
    const url = storedRef ? `${path}?ref=${storedRef}` : path;

    navigate(url);
  };

  return (
    <div className="title-container">
        <div className="title-section">
            <div className="icon"><MdOutlineElectricBolt/></div>
            <h3>{title}</h3>
        </div>
        {secTitle&&(<div style={{cursor:'pointer'}} onClick={() => navigateWithRef(to)}>{secTitle}</div>)}
    </div>
  )
}

export default TitleSection
