import { Link, Outlet, useLocation } from "react-router-dom"
import '../Style/ProfileLayout.css'
import BannerPage from './../Shared/BannerPage';
import profile from '../assets/Img/profile.jpg';

const ProfileLayout = () => {
    const location = useLocation();
  return (
    <>
      <BannerPage pageTitle={"My Profile"} image={profile} />
    <div className="profile-layout">
        <div className="btns-profile">
            <Link to='/my-account' className={`btn-profile ${location.pathname==='/my-account'&&"active"}`}>Account Details</Link>
            <Link to='/my-account/change-password' className={`btn-profile ${location.pathname==='/my-account/change-password'&&"active"}`}>Change Password</Link>
            <Link to='/my-account/my-orders' className={`btn-profile ${location.pathname==='/my-account/my-orders'&&"active"}`}>Orders</Link>
            <Link to='/cart' className="btn-profile">My Cart</Link>
            <Link  className="btn-profile">Logout</Link>
        </div>
        <div className="content"><Outlet/></div>
    </div>
    </>
  )
}

export default ProfileLayout
