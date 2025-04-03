import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { SubmitPage } from './pages/SubmitPage';
import { Footer } from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<DetailPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}