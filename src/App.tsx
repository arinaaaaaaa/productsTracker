import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './global.scss';
import HomePageComponent from './components/pages/home.page';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageComponent/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
