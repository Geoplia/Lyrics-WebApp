import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import Lyric from './Components/Lyric';
import { ContextP } from './Components/Context';


function App() {
 
  
  return (
   
    <ContextP>
    <Router>
          {/* <nav>
            <Link to="/">Home</Link>
          </nav>  */}
          <Navbar />

        
             <div className="container">
                      <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path="/lyric/track/:id" element={<Lyric />} />
                      </Routes>

                </div>
        
        
    </Router>
    </ContextP>

  );
}
export default App;