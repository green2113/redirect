import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DDNet from './pages/ddnet';
import Err from './pages/error';

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <main className='flex-grow' style={{padding: '0 30px'}}>
          <Routes>
            <Route path="/ddnet" element={<DDNet /> } />
            <Route path="*" element={<Err />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
