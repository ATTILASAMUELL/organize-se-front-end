
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { RequireAuth } from './context/Auth/RequireAuth';
import { Dashboard } from './pages/dashboard';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Login/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}></Route>
      </Routes>
    </div>
  );
}

export default App;
