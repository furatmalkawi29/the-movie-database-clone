import './App.scss';
import {Main, Footer, Navbar, NavbarSmallScreen} from './components';
import { BrowserRouter } from 'react-router-dom';


function App() {

  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
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
