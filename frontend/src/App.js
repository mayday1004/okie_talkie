import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Register, Login } from './pages';
import AlertNotification from './components/AlertNotification';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      </BrowserRouter>
      <AlertNotification />
    </>
  );
}

export default App;
