import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ResultPage from './pages/ResultPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
