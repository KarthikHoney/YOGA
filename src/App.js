// App.js
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import RegisterPage from './form/RegisterPage';
import Login from './form/Login';
import StudentSidebar from './components/StudentSidebar';
import TrainerDashboard from './components/TrainerDashboard';
import TrainerDetails from './TrainerStudent/TrainerDetails';
import TrainerPage from './TrainerStudent/TrainerPage';
import TrainerStudentGrade from './TrainerStudent/TrainerStudentGrade';
import StudentDashboard from './student/StudentDashboard';
import StudentDetails from './student/StudentDetails';
import StudentGrade from './student/StudentGrade';
import TrainerReg from './form/TrainerReg';
import Tstudent from './TrainerStudent/Tstudent';

function App() {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
    const [studentId,setStudentId]=useState(localStorage.getItem('userId')||'')
    const [studentName, setStudentName] = useState(localStorage.getItem('studentName') || ''); 

    const handleLogin = (role,id, name) => {
        setUserRole(role);
        setStudentId(id)
        setStudentName(name);
        localStorage.setItem('userRole', role);
        localStorage.setItem('studentName', name);
        localStorage.setItem('userId',id) 
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route exact path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/registration" element={<RegisterPage />} />
                <Route path="/trainerReg" element={<TrainerReg />} />

                {userRole === 'individualstudent' && (
                    <Route path="/" element={<StudentSidebar />}>
                        <Route path="student-dashboard" element={<StudentDashboard studentName={studentName}  />} />
                        <Route path="student-details" element={<StudentDetails studentId={studentId} />} /> 
                        <Route path="student-grade" element={<StudentGrade />} />
                    </Route>
                )}
                {userRole === 'trainerstudent' && (
                    <Route path="/" element={<TrainerDashboard />}>
                        <Route path="trainer-dashboard" element={<TrainerPage studentName={studentName} />} />
                        <Route path="trainer-details" element={<TrainerDetails studentId={studentId} />} />
                        <Route path="trainer-student-grade" element={<TrainerStudentGrade />} />
                        <Route path="student-view-trainer" element={<Tstudent />} />
                    </Route>
                )}

                <Route path="*" element={<Login onLogin={handleLogin} />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
