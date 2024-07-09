import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Error404, RegisterSuccess, Home, Magazines, MagazineDetail, NotAuthen } from './pages';

/* Student */
import StudentDashboard from './pages/users/student/dashBoard/DashBoard';
import StudentSubmissionForm from './pages/users/student/submissionForm/SubmissionForm';
import StudentStatus from './pages/users/student/status/Status';

/* Coordinator */
import CoordinatorDashboard from './pages/users/coordinator/dashBoard/DashBoard';
import CoordinatorViewSubmission from './pages/users/coordinator/viewSubmission/ViewSubmission';
import CoordinatorSubmissionWindow from './pages/users/coordinator/submissionWindow/SubmissionWindow';
import CoordinatorDetailSubmission from './pages/users/coordinator/viewDetailSubmission/ViewDetailSubmission';

/* Manager */
import ManagerDashboard from './pages/users/manager/dashBoard/DashBoard';
import ManagerViewSubmission from './pages/users/manager/viewSelectedSubmission/ViewSelectedSubmission';
import ManagerViewDetailSubmission from './pages/users/manager/viewDetailSubmission/ViewDetailSubmission';

/* Admin */
import AdminDashboard from './pages/users/admin/dashBoard/DashBoard';
import AdminRegister from './pages/users/admin/register/Register';
import AdminSubmissionWindow from './pages/users/admin/submissionWindow/SubmissionWindow';
import AdminFaculty from './pages/users/admin/faculty/Faculty';

import './app.css';

const PageWrapper = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const App = () => (
  <Router>
    <Routes>
      {/* Pages */}
      <Route path='/' element={<PageWrapper className='gradient_bg'><Home /></PageWrapper>} />
      <Route path='/home' element={<PageWrapper className='gradient_bg'><Home /></PageWrapper>} />
      <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
      <Route path='/signup' element={<PageWrapper><Register /></PageWrapper>} />
      <Route path='/signupsuccess' element={<PageWrapper><RegisterSuccess /></PageWrapper>} />
      <Route path='/publicmagazine' element={<PageWrapper><Magazines /></PageWrapper>} />
      <Route path='/publicmagazine/detail' element={<PageWrapper><MagazineDetail /></PageWrapper>} />

      {/* Student */}
      <Route path='/student/dashboard' element={<PageWrapper><StudentDashboard /></PageWrapper>} />
      <Route path='/student/submit-magazine' element={<PageWrapper><StudentSubmissionForm /></PageWrapper>} />
      <Route path='/student/check-publish-status' element={<PageWrapper><StudentStatus /></PageWrapper>} />
      
      {/* Coordinator */}
      <Route path='/coordinator/dashboard' element={<PageWrapper><CoordinatorDashboard /></PageWrapper>} />
      <Route path='/coordinator/viewsubmission' element={<PageWrapper><CoordinatorViewSubmission /></PageWrapper>} />
      <Route path='/coordinator/submissionwindow' element={<PageWrapper><CoordinatorSubmissionWindow /></PageWrapper>} />
      <Route path='/coordinator/viewdetailsubmission/:submissionId' element={<PageWrapper><CoordinatorDetailSubmission /></PageWrapper>} />

      {/* Manager */}
      <Route path='/manager/dashboard' element={<PageWrapper><ManagerDashboard /></PageWrapper>} />
      <Route path='/manager/viewsubmission' element={<PageWrapper><ManagerViewSubmission /></PageWrapper>} />
      <Route path='/manager/viewdetailsubmission/:submissionId' element={<PageWrapper><ManagerViewDetailSubmission /></PageWrapper>} />

      {/* Admin */}
      <Route path='/admin/dashboard' element={<PageWrapper><AdminDashboard /></PageWrapper>} />
      <Route path='/admin/register' element={<PageWrapper><AdminRegister /></PageWrapper>} />
      <Route path='/admin/submissionwindow' element={<PageWrapper><AdminSubmissionWindow /></PageWrapper>} />
      <Route path='/admin/faculty' element={<PageWrapper><AdminFaculty /></PageWrapper>} />

      <Route path='/guest/dashboard' element={<PageWrapper className='gradient_bg'><NotAuthen /></PageWrapper>} />
      <Route path='*' element={<PageWrapper className='gradient_bg'><Error404 /></PageWrapper>} />
    </Routes>
  </Router>
);

export default App;
