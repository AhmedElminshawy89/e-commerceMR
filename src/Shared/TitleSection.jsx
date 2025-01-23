/* eslint-disable react/prop-types */

import { MdOutlineElectricBolt } from "react-icons/md";
import { Link } from "react-router-dom";

const TitleSection = ({title , secTitle,to}) => {
  return (
    <div className="title-container">
        <div className="title-section">
            <div className="icon"><MdOutlineElectricBolt/></div>
            <h3>{title}</h3>
        </div>
        {secTitle&&(<Link to={to}>{secTitle}</Link>)}
    </div>
  )
}

export default TitleSection
