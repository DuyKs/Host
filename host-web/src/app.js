import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component

import { Footer, Header, Wim, Features, Blog } from './containers';
import { CTA, Navbar } from './components';
import { Login, Register, Error404} from './pages';

import './app.css';

const HomePage = () => {
  return (
    <div className='gradient_bg'>
      <Navbar />
      <Header />
      <Wim />
      <Features />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

const LoginPage = () => {
  return (
  <div>
    <Login/>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div>
    <Register/>
    </div>
  );
};

/*
const AdminLoginPage = () => {
  return (
  <div>
    </>
    </div>
  );
};

const CordinatorLoginPage = () => {
  return (
  <div>
    </>
    </div>
  );
};

const StudentLoginPage = () => {
  return (
  <div>
    </>
    </div>
  );
};

const GuestLoginPage = () => {
  return (
    <div>
    </>
    </div>
  );
};
const LibaryPage = () => {
  return (
  <div>
    </>
    </div>
  );
};

const EventsPage = () => {
  return (
    <div>
    </>
    </div>
  );
};

const NewsPage = () => {
  return (
    <div>
    </>
    </div>
  );
};
*/
/*
        <Route path='/home' element={<AdminLoginPage />} />
        <Route path='/login' element={<CordinatorLoginPage />} />
        <Route path='/signup' element={<StudentLoginPage />} />
        <Route path='/home' element={<GuestLoginPage />} />
        <Route path='/login' element={<LibaryPage />} />
        <Route path='/signup' element={<EventsPage />} />
*/

const NoPage = () => {
  return (
    <div className='gradient_bg'>
    <Error404/>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
