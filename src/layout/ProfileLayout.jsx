import { Link, Outlet, useLocation } from "react-router-dom";
import "../Style/ProfileLayout.css";
import BannerPage from "./../Shared/BannerPage";
import { useTranslation } from "react-i18next";
import { useShowAllAdminImageBannersQuery } from "../app/Api/SiteDetails";

const ProfileLayout = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const {data} = useShowAllAdminImageBannersQuery()

  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <>
      <BannerPage
        pageTitle={i18n.language === "EN" ? "My Profile" : "ملفي الشخصي"}
        image={data?.imageBanner?.map((e)=>e.profile)}
      />
      <div className="profile-layout">
        <div className="btns-profile">
          <Link
            to="/my-account"
            className={`btn-profile ${
              location.pathname === "/my-account" && "active"
            }`}
          >
            {i18n.language === "EN" ? "Account Details" : "تفاصيل الحساب"}
          </Link>
          <Link
            to="/my-account/change-password"
            className={`btn-profile ${
              location.pathname === "/my-account/change-password" && "active"
            }`}
          >
            {i18n.language === "EN" ? "Change Password" : "تغيير كلمة المرور"}
          </Link>
          <Link
            to="/my-account/my-orders"
            className={`btn-profile ${
              location.pathname === "/my-account/my-orders" && "active"
            }`}
          >
            {i18n.language === "EN" ? "My Orders" : "طلباتي"}
          </Link>
          <Link
            to="/my-account/member-by-member"
            className={`btn-profile ${
              location.pathname === "/my-account/member-by-member" && "active"
            }`}
          >
            {i18n.language === "EN" ? "Member Get Member" : "عضو احصل على عضو"}
          </Link>
          <Link
            to="/my-account/referral-purchases"
            className={`btn-profile ${
              location.pathname === "/my-account/referral-purchases" && "active"
            }`}
          >
            {i18n.language === "EN" ? "Referral Purchases" : "مشتريات الإحالة"}
          </Link>
          <Link to="/cart" className="btn-profile">
            {i18n.language === "EN" ? "My Cart" : "سلة التسوق الخاصة بي"}
          </Link>
          <p className="btn-profile logout-btn" onClick={handleLogOut}>
            {i18n.language === "EN" ? "Logout" : "تسجيل الخروج"}
          </p>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
