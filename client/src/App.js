import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AgentPage from './Pages/AgentPage';
import Properties from './Pages/Properties';
import SignupForm from './components/signupForm';
import LoginForm from './components/Login';
import BuyerSignupForm from './components/BuyerSignupForm';
import BuyerLogin from './components/BuyerLogin';
import MyBookings from './Pages/Booking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents" element={<AgentPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/buyersignup' element={<BuyerSignupForm />} />
        <Route path='/buyerLogin' element={<BuyerLogin />} />
        <Route path='/booking' element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;