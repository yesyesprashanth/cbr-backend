import { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import UploadPayment from './components/UploadPayment';
import ManuscriptUpload from './components/ManuscriptUpload';
import WriteUs from './components/WriteUs';
import FeedbackList from './components/FeedbackList';
import PaymentList from './components/PaymentList';
import ManuscriptList from './components/ManuscriptList';
import UserList from './components/UserList';
import MenuStrip from './components/MenuStrip';
import Login from './components/Login';

function App() {
  const [visibleComponent, setVisibleComponent] = useState('Login');
  const [loggedIn, setLoggedIn] = useState(false);

  const onMenuItemClick = (componentName) => {
    setVisibleComponent(componentName);
    if(componentName==='Login')
    setLoggedIn(false);  
  };

  const handleLogin = (status) => {
    setLoggedIn(status);   
    if(status)
      setVisibleComponent('UserList');
  };



  return (
    <div className="App">
    {loggedIn && <MenuStrip onMenuItemClick={onMenuItemClick} />}
    <div>
      {visibleComponent === 'Login' && <Login  onLogin={handleLogin} />}
      {visibleComponent === 'RegistrationForm' && <RegistrationForm />}
      {visibleComponent === 'UploadPayment' && <UploadPayment />}
      {visibleComponent === 'ManuscriptUpload' && <ManuscriptUpload />}
      {visibleComponent === 'WriteUs' && <WriteUs />}
      {visibleComponent === 'FeedbackList' && <FeedbackList />}
      {visibleComponent === 'PaymentList' && <PaymentList />}
      {visibleComponent === 'ManuscriptList' && <ManuscriptList />}
      {visibleComponent === 'UserList' && <UserList />}
    </div>
    </div>
  );
}

export default App;
