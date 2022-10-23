// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Router, Routes} from 'react-router-dom'
import Routers from './routers/Routers';
import Header from './components/Organisms/User/Header/Header';

// export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routers/>
    </BrowserRouter>
  );
}

export default App;
