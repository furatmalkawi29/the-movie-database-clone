import './App.scss';
import {Main, Footer, Navbar, NavbarSmallScreen, 
  ToastNotifications} from './components';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';


function App() {

  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  return (
    <>
      <ToastProvider>
        <ToastNotifications />
      </ToastProvider>
      <BrowserRouter>
        <Navbar />
        <NavbarSmallScreen />
        <Main />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
