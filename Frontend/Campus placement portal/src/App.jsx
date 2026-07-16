import {Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Applicants from './pages/Applicants';
import Jobs from './pages/Jobs';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard'
import PostJob from './pages/PostJob';
import ProtectedRoute from './components/ProtectedRouter';
import Navbar from './components/Navbar';
import MyApplications from './pages/MyApplications';

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element = {<Login />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/jobs' element = {<ProtectedRoute role= "recruiter"><Jobs /></ProtectedRoute>} /> 
      <Route path='/profile' element = {<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/applicants/:id' element = {<ProtectedRoute role= "recruiter"><Applicants /></ProtectedRoute>} />
      <Route path='/recruiterDashboard' element = {<ProtectedRoute role= "recruiter"><RecruiterDashboard /></ProtectedRoute>} />
      <Route path='/studentDashboard' element = {<ProtectedRoute role= "student"><StudentDashboard /></ProtectedRoute>} />
      <Route path='/postjob' element = {<ProtectedRoute role= "recruiter"><PostJob/></ProtectedRoute>} />
      <Route path='/postjob/:id' element = {<ProtectedRoute role= "recruiter"><PostJob/></ProtectedRoute>} />
      <Route path="/myApplications" element={<ProtectedRoute role="student"><MyApplications/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App;