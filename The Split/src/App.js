import { Routes, Link, Route } from 'react-router-dom';
import './App.css';
import About from './About';
import Bar from './The Split/Bar';
import Menu from './The Split/Menu';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to = "/About">О нас</Link>
        </nav>
         <nav>
          <Link to = "/Bar">Бар</Link>
        </nav>
           <nav>
          <Link to = "/Menu">Закуски</Link>
        </nav>
        <Routes>
          <Route path = "/About" element = {<About></About>}></Route>
          <Route path = "/Bar" element = {<Bar></Bar>}></Route>
          <Route path = "/Menu" element = {<Menu></Menu>}></Route>
          </Routes>
      </header>
    </div>
  );
}

export default App;
