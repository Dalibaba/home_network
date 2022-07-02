import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";


function App() {
  return (
    <Router>
      
    <div className="app">
      <NavBar/>
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />}/>
     </Routes>
    </div>    
    </div>
    </Router>

  );
}

export default App;
