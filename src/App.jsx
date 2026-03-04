import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShotProvider } from './context/ShotContext';
import { ProfileProvider } from './context/ProfileContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewShot from './pages/NewShot';
import ShotHistory from './pages/ShotHistory';
import ShotDetail from './pages/ShotDetail';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ProfileProvider>
      <ShotProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="new" element={<NewShot />} />
              <Route path="edit/:id" element={<NewShot />} />
              <Route path="history" element={<ShotHistory />} />
              <Route path="shot/:id" element={<ShotDetail />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShotProvider>
    </ProfileProvider>
  );
}
