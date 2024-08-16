import Login from './component/auth/login';
import ComplaintForm from './component/service/complaint';
import Admin from './component/service/Admin';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      {/* <NavigationBar /> */}
      
        <div className="App">
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/complaint' element={<ComplaintForm />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            
          </Routes>
        </div>
        
    </Router>
    
  );
}

export default App;
