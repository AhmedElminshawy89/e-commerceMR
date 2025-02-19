import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import NotFound from '../Pages/NotFound/NotFound'; 
import Login from '../Pages/Auth/Login';
import SignUp from '../Pages/Auth/SignUp';
import OTPForm from '../Pages/Auth/OTPForm';
import AppLayout from '../layout/Applayout';
import Contact from '../Pages/Contact/Contact';
import ProductsPage from '../Pages/Products/Products';
import DashboardIndex from '../Pages/Admin/DashboardIndex';
import Category from '../Pages/Admin/Category';
import CategorySearch from '../Pages/Admin/CategorySearch';
import ProductsAdmin from '../Pages/Admin/Products';
import Banner from '../Pages/Admin/Banner';
import Advertising from '../Pages/Admin/Advertising';
import Services from '../Pages/Admin/Services';
import AboutUs from '../Pages/Admin/AboutUs';
import CashBack from '../Pages/Admin/CashBack';
import Reviews from '../Pages/Admin/Review';
import PaymentTransactions from '../Pages/Admin/Payments';
import UserDetails from '../Pages/Admin/Users';
import AdminPanel from '../Pages/Admin/Admin';
import Sales from '../Pages/Admin/Sales';
import ProductsDetails from '../Pages/ProductDetails/ProductDetails';
import Cart from '../Pages/cart/Cart';
import ProfileLayout from '../layout/ProfileLayout';
import AccountDetails from '../components/AccountDetails';
import ChangePassword from '../components/ChangegPassword';
import Orders from '../components/Orders';
import ForgetPassword from '../Pages/Auth/ForgetPassword';
import ResetPassword from '../Pages/Auth/resetPassword';
import { useEffect, useState } from 'react';
import WhyUs from '../Pages/Admin/WhyUs';
import ContactShow from '../Pages/Admin/ContactShow';
import SubscribeShow from '../Pages/Admin/SubscribeShow';
import FeatureAdmin from '../Pages/Admin/FeatureAdmin';
import ContactusSec from '../Pages/Admin/ContactusSec';
import LoginAdmin from '../Pages/Auth/LoginAdmin';
import ImageBanners from '../Pages/Admin/ImageBanners';
import DashboardLayout from '../layout/DashboardLayout';
import OverAllInfo from '../Pages/Admin/OverAllInfo';
import SocialMedia from '../Pages/Admin/SocialMedia';
import UserSearch from '../Pages/Admin/UsersSearch';
import ProductSearch from '../Pages/Admin/ProductSearch';
import PaymentSearch from '../Pages/Admin/PaymentSearch';
import ContactSearch from '../Pages/Admin/ContactSearch';
import AdminSearch from '../Pages/Admin/AdminSearch';
import ProductOutOfStock from '../Pages/Admin/ProductOutOfStock';
import RevSales from '../Pages/Admin/RevSales';
import MemberToMember from '../components/MemberToMember';
import ReferralPurchases from '../components/ReferralPurchases';
import UserReferalPurshase from '../Pages/Admin/UserReferalPurshase';
import CommisionSales from '../Pages/Admin/CommisionSales';
import CalculateCommission from '../Pages/Admin/CalculateCommission';
import AllComission from '../Pages/Admin/AllComission';
import CommissionSalesAdmin from '../Pages/Admin/CommissionSalesAdmin';
import SearchCommisionAdmin from '../Pages/Admin/SearchCommisionAdmin';
import AllCommissionToSales from '../Pages/Admin/AllCommissionToSales';
import LinkSales from '../Pages/Admin/LinkSales';

const Routing = () => {
  const location = useLocation();
  const [refCode, setRefCode] = useState(null);
  const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
  const tokenAdmin = document.cookie.split('; ').find(row => row.startsWith('tokenAdmin='))?.split('=')[1];
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res === 'Moderator' || res === 'Admin';

  useEffect(() => {
    const storedRef = localStorage.getItem('ref');
    
    if (storedRef) {
      setRefCode(storedRef); 
    } else {
      const searchParams = new URLSearchParams(location.search);
      const ref = searchParams.get('ref');
      
      if (ref) {
        setRefCode(ref); 
        localStorage.setItem('ref', ref);
      }
    }
  }, [location]);

  useEffect(() => {
    if (refCode !== null) {
      localStorage.setItem('ref', refCode);
    }
  }, [refCode]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newRef = searchParams.get('ref');
    
    if (newRef && newRef !== refCode) {
      setRefCode(newRef);
      localStorage.setItem('ref', newRef); 
    }
  }, [location, refCode]);


  return (
    <Routes>  
        <Route path="/login" element={token?<Navigate to={'/'}/>:<Login />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/sign-up" element={token?<Navigate to={'/'}/>:<SignUp />} />
        <Route path="/verify-email/:email" element={token?<Navigate to={'/'}/>:<OTPForm />} />
        <Route path="/forgot-password" element={token?<Navigate to={'/'}/>:<ForgetPassword />} />
        <Route path="/reset-password/:email" element={token?<Navigate to={'/'}/>:<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductsDetails />} />
        <Route path="/cart" element={<Cart />} />
      <Route path='/my-account' element={!token?<Navigate to={'/'}/>:<ProfileLayout/>}>
        <Route index element={!token?<Navigate to={'/'}/>:<AccountDetails/>}/>
        <Route path='change-password' element={!token?<Navigate to={'/'}/>:<ChangePassword/>}/>
        <Route path='my-orders' element={!token?<Navigate to={'/'}/>:<Orders/>}/>
        <Route path='member-by-member' element={!token?<Navigate to={'/'}/>:<MemberToMember/>}/>
        <Route path='referral-purchases' element={!token?<Navigate to={'/'}/>:<ReferralPurchases/>}/>
      </Route>
      </Route>

<Route 
  path='/dashboard/admin/control' 
  element={(!tokenAdmin || !(res === "Moderator" || res === "Admin" || res === "Sales")) ? <Navigate to='/login-admin' /> : <DashboardLayout />}
>
  <Route index element={(!tokenAdmin || !(res === "Moderator" || res === "Admin" || res === "Sales")) ? <Navigate to='/login-admin' /> : <DashboardIndex />} />
  
  <Route 
    path='category' 
    element={(!tokenAdmin ||  !IsAvailable) ? <Navigate to='/login-admin' /> : <Category />} 
  />
    
    <Route 
    path='referred-customer' 
    element={(!tokenAdmin ||  !IsAvailable) ? <Navigate to='/login-admin' /> : <UserReferalPurshase />} 
  />
  
  <Route 
    path='CategorySearch' 
    element={(!tokenAdmin ||  !IsAvailable) ? <Navigate to='/login-admin' /> : <CategorySearch />} 
  />
  
  <Route 
  path="sales-commission" 
  element={(tokenAdmin ||  IsAvailable) ? <CommissionSalesAdmin /> : <Navigate to="/login-admin" />} 
/>

<Route 
  path="allcommission-sales" 
  element={(tokenAdmin ||  IsAvailable) ? <AllCommissionToSales /> : <Navigate to="/login-admin" />} 
/>

<Route 
  path="CommissionSearch" 
  element={(tokenAdmin ||  IsAvailable) ? <SearchCommisionAdmin /> : <Navigate to="/login-admin" />} 
/>
  <Route 
    path='ProductOutOfStock' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <ProductOutOfStock />} 
  />
  
  <Route 
    path='products' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <ProductsAdmin />} 
  />
  
  <Route 
    path='ProductSearch' 
    element={(!tokenAdmin ||  !IsAvailable) ? <Navigate to='/login-admin' /> : <ProductSearch />} 
  />
  
  <Route 
    path='banner' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <Banner />} 
  />
  
  <Route 
    path='image-banner' 
    element={(!tokenAdmin ||  !IsAvailable) ? <Navigate to='/login-admin' /> : <ImageBanners />} 
  />
  
  <Route 
    path='advertising' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <Advertising />} 
  />
  
  <Route 
    path='services' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <Services />} 
  />
  
  <Route 
    path='about-us' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <AboutUs />} 
  />
  
  <Route 
    path='social-link' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <SocialMedia />} 
  />
  
  <Route 
    path='why-us' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <WhyUs />} 
  />
  
  <Route 
    path='discount' 
    element={(!tokenAdmin ||  !IsAvailable) ? <Navigate to='/login-admin' /> : <CashBack />} 
  />
  
  <Route 
    path='feature' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <FeatureAdmin />} 
  />
  
  <Route 
    path='review' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <Reviews />} 
  />
  
  <Route 
    path='contact-us-section' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <ContactusSec />} 
  />
  
  <Route 
    path='over-all-info' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <OverAllInfo />} 
  />
  
  <Route 
    path='contact' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <ContactShow />} 
  />
  
  <Route 
    path='ContactSearch' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <ContactSearch />} 
  />
  
  <Route 
    path='subscribe' 
    element={(!tokenAdmin ||   !IsAvailable) ? <Navigate to='/login-admin' /> : <SubscribeShow />} 
  />
  
  <Route 
    path='payment' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <PaymentTransactions />} 
  />
  
  <Route 
    path='PaymentSearch' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <PaymentSearch />} 
  />
  
  <Route 
    path='user' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <UserDetails />} 
  />
  
  <Route 
    path='UserSearch' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <UserSearch />} 
  />
  
  <Route 
    path='admin' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <AdminPanel />} 
  />
  
  <Route 
    path='AdminSearch' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <AdminSearch />} 
  />
  
  <Route 
    path='sales' 
    element={(!tokenAdmin || !IsAvailable) ? <Navigate to='/login-admin' /> : <Sales />} 
  />
  
  <Route 
  path="your-link" 
  element={tokenAdmin && res == "Sales" ? <LinkSales /> : <Navigate to="/login-admin" />} 
/>
<Route 
  path="Rev-sales" 
  element={tokenAdmin && res == "Sales" ? <RevSales /> : <Navigate to="/login-admin" />} 
/>
<Route 
  path="pending-orders" 
  element={tokenAdmin && res == "Sales" ? <AllComission /> : <Navigate to="/login-admin" />} 
/>
<Route 
  path="calculate-commission" 
  element={tokenAdmin && res == "Sales" ? <CalculateCommission /> : <Navigate to="/login-admin" />} 
/>
<Route 
  path="all-commission" 
  element={tokenAdmin && res == "Sales" ? <CommisionSales /> : <Navigate to="/login-admin" />} 
/>

</Route>

      
    </Routes>
  );
};

export default Routing;
