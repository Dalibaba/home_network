import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import  Sensor  from './pages/Sensor';


function App() {
  return (
    <Router>
      
    <div className="app">
      <NavBar/>
      <div className="content">
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/sensor" element={<Sensor/>}/>
     </Routes>
    </div>    
    </div>
    </Router>

  );
}

export default App;
