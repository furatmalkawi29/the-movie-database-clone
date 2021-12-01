import './App.scss';
import Main from './components/Main';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NavbarSmallScreen from './components/NavbarSmallScreen';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <NavbarSmallScreen/>
      <Main/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
