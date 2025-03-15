import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Redirect from './pages/redirect';

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <main className='flex-grow' style={{padding: '0 30px'}}>
          <Routes>
            <Route path="/" element={<Redirect /> } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
