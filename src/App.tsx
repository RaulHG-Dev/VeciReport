import { MainLayout } from './layouts/MainLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { MapPage } from './pages/dashboard/MapPage'
import { NewReportPage } from './pages/dashboard/NewReportPage'
import { MyReportsPage } from './pages/dashboard/MyReportsPage'
import { ProfilePage } from './pages/dashboard/ProfilePage'
import { HomePage } from './pages/public/HomePage'
import { LoginPage } from './pages/public/LoginPage'
import { JoinColonyPage } from './pages/public/JoinColonyPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

export const App = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unirse" element={<JoinColonyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/reportar" element={<NewReportPage />} />
        <Route path="/mis-reportes" element={<MyReportsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
)
