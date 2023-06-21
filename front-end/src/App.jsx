
import './App.css'
import { Routes, Route } from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';
import Userprofile from './pages/userProfile';
import Home from './pages/Home';



function App() {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user' element={<Userprofile />} />
      <Route path='/api/signup' element={<Signup />} />
      <Route path='/api/login' element={<Login />} />
    </Routes>
  )
}

export default App
