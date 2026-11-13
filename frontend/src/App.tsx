import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { ChildExercise } from './pages/ChildExercise';
import { SpecialistDashboard } from './pages/SpecialistDashboard';
import { ExerciseStudio } from './pages/ExerciseStudio';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { Doctors } from './pages/Doctors';
import { DoctorProfile } from './pages/DoctorProfile';
import { DoctorHome } from './pages/DoctorHome';
import { DiagnosisForm } from './pages/DiagnosisForm';
import { Communities } from './pages/Communities';
import { CommunityPage } from './pages/CommunityPage';
import { ParentProfile } from './pages/ParentProfile';
import { PendingReview } from './pages/PendingReview';
import { AuthProvider } from './auth/AuthContext';
import { GuestOnly, RequireAuth } from './auth/RequireAuth';
import { AccessibilityProvider } from './a11y/AccessibilityProvider';
import { AccessibilityWidget } from './a11y/AccessibilityWidget';

export function App() {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <AuthProvider>
    <AccessibilityProvider>
    <div dir="rtl" lang="ar" className="min-h-screen w-full bg-cream font-sans text-ink">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/exercise" element={<ChildExercise />} />
          <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<RequireAuth roles={['parent']}><ParentProfile /></RequireAuth>} />
          <Route path="/pending" element={<RequireAuth roles={['doctor', 'specialist']}><PendingReview /></RequireAuth>} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/doctor" element={<RequireAuth roles={['doctor']} approvedOnly><DoctorHome /></RequireAuth>} />
          <Route path="/doctor/case/:bookingId" element={<RequireAuth roles={['doctor']} approvedOnly><DiagnosisForm /></RequireAuth>} />
          <Route path="/community" element={<RequireAuth roles={['parent', 'doctor', 'specialist']} approvedOnly><Communities /></RequireAuth>} />
          <Route path="/community/:key" element={<RequireAuth roles={['parent', 'doctor', 'specialist']} approvedOnly><CommunityPage /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth roles={['specialist']} approvedOnly><SpecialistDashboard /></RequireAuth>} />
          <Route path="/studio" element={<RequireAuth roles={['doctor', 'specialist']} approvedOnly><ExerciseStudio /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
    <AccessibilityWidget />
    </AccessibilityProvider>
    </AuthProvider>);

}