import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import NotFound from '../Pages/NotFound/NotFound'; 
import Login from '../Pages/Auth/Login';
import SignUp from '../Pages/Auth/SignUp';
import OTPForm from '../Pages/Auth/OTPForm';
import AppLayout from '../layout/Applayout';
import Contact from '../Pages/Contact/Contact';
import ProductsPage from '../Pages/Products/Products';
import DashboardLayout from '../layout/Dashboardlayout';
import DashboardIndex from '../Pages/Admin/DashboardIndex';
import Category from '../Pages/Admin/Category';
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

const Routing = () => {
  return (
    <Routes>  
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email/:email" element={<OTPForm />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      <Route path='/my-account' element={<ProfileLayout/>}>
        <Route index element={<AccountDetails/>}/>
        <Route path='change-password' element={<ChangePassword/>}/>
        <Route path='my-orders' element={<Orders/>}/>
      </Route>
      </Route>
      <Route path='/dashboard/admin/control' element={<DashboardLayout/>}>
        <Route index element={<DashboardIndex/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='products' element={<ProductsAdmin/>}/>
        <Route path='banner' element={<Banner/>}/>
        <Route path='advertising' element={<Advertising/>}/>
        <Route path='services' element={<Services/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='cashback' element={<CashBack/>}/>
        <Route path='review' element={<Reviews/>}/>
        <Route path='payment' element={<PaymentTransactions/>}/>
        <Route path='user' element={<UserDetails/>}/>
        <Route path='admin' element={<AdminPanel/>}/>
        <Route path='sales' element={<Sales/>}/>
      </Route>
      
    </Routes>
  );
};

export default Routing;
