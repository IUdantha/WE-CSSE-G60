import './App.css';
import Home from './pages/Home';

import AddStaff from './pages/StaffManagement/AddStaff';
import UpdateStaff from './pages/StaffManagement/UpdateStaff';
import StaffManagement from './pages/StaffManagement/StaffManagement';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import AddIncome from './pages/SalaryManagement/AddIncome';
import EditIncomePage from './pages/SalaryManagement/EditIncomePage';
import ViewIncomePage from './pages/SalaryManagement/ViewIncomePage';
import AddInspector from './pages/SalaryManagement/AddInspector';
import EditInspector from './pages/SalaryManagement/EditInspector';
import ViewInspector from './pages/SalaryManagement/ViewInspector';

import Login from './pages/Login/Login';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoggedIn>
                <Login />
              </LoggedIn>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/staff-management/add-staff-member" element={<AddStaff />} />
          <Route path="staff-management/update-member" element={<UpdateStaff />} />

          {/* Transport Management */}
          <Route path="/transport-management" element={<ViewIncomePage />} />
          <Route path="/transport-management/add-income" element={<AddIncome />} />
          <Route path="/transport-management/add-inspector" element={<AddInspector />} />
          <Route path="/transport-management/inspector" element={<ViewInspector />} />
          <Route path="/transport-management/edit-inspector/:id" element={<EditInspector />} />
          <Route path="/transport-management/edit-income/:id" element={<EditIncomePage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

// const LoggedOut = ({ children }) => {
//   if (localStorage.getItem('token')) {
//     return children;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

export const LoggedIn = ({ children }) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};
