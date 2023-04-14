import './App.css';
import {
    BrowserRouter as Router,
    Routes, 
    Route 
} from 'react-router-dom'
import Login from './Component/Login';
import Otp from './Component/Otp';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
      </Routes>
    </Router>
  );
}

export default App;
