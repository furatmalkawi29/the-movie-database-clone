import './App.scss';
import {Main, Footer, Navbar, NavbarSmallScreen, 
  ToastNotifications} from './components';
  import { HashRouter } from "react-router-dom";
  import { ToastProvider } from 'react-toast-notifications';


function App() {
  return (
    <>
      <ToastProvider>
        <ToastNotifications />
      </ToastProvider>
      <HashRouter>
        <Navbar />
        <NavbarSmallScreen />
        <Main />
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
