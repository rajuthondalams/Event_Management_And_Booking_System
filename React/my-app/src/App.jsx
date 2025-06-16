import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import AboutUs from './Components/AboutUs';
import MyBooking from './Components/MyBooking';
import Login from './Components/Login';
import Register from "./Components/Register";
import ConfirmBooking from './Components/ConfirmBooking'
import Booking from './Components/Booking';
import { AppProvider, AppContext } from './Components/AppContext';  
import AdminHome from './Components/AdminHome';
import { useContext, useEffect } from 'react';
import FunctionHall from './Components/FunctionHall';
import Registration from './Components/Registration';
import UserHome from './Components/UserHome';
import Instructions from './Components/Instructions';



function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useContext(AppContext);  

  const spotlight = location.pathname.includes('ContactUs') ? "ContactUs" : "About";

  // Prevent browser back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <div className='App'>
      
      {role === 'admin' && <AdminHome />}

      {role !== 'admin' && location.pathname !== '/adminhome' && <NavigationBar />}

      {role !== 'admin' && (
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/About' element={<AboutUs spotlight={spotlight} />} />
          <Route path='/ContactUs' element={<AboutUs spotlight={spotlight} />} />
          <Route path='/Instruction' element={<Instructions />} />
          <Route path='/MyBooking' element={<MyBooking />} />
          <Route path='/Login/*' element={<Login />} /> 
          <Route path='/Registration' element={<Registration />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Booking' element={<Booking />} />
          <Route path='/FunctionHall' element={<FunctionHall />} />
          <Route path='/ConfirmBooking' element={<ConfirmBooking />} />
          <Route path='/UserHome' element={<UserHome />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>  
      <AppContent />
    </AppProvider>
  );
}

export default App;