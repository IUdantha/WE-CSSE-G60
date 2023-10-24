// Import necessary dependencies and components
import './App.css'; // Import styles for the app
import Home from './pages/Home'; // Import the Home component

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import AddIncome from './pages/TransportManagement/AddIncome';
import EditIncomePage from './pages/TransportManagement/EditIncomePage';
import ViewIncomePage from './pages/TransportManagement/ViewIncomePage';
import AddInspector from './pages/TransportManagement/AddInspector';
import EditInspector from './pages/TransportManagement/EditInspector';
import ViewInspector from './pages/TransportManagement/ViewInspector';
import AddSchedule from './pages/TransportManagement/AddSchedule';
import EditSchedule from './pages/TransportManagement/EditSchedule';
import ViewSchedule from './pages/TransportManagement/ViewSchedule';
import AddRoute from './pages/TransportManagement/AddRoute';
import EditRoute from './pages/TransportManagement/EditRoute';
import ViewRoute from './pages/TransportManagement/ViewRoute';

import Login from './pages/Login/Login'; // Import the Login component

// Define the main App component`
function App() {
  return (
    <ThemeProvider theme={theme}>
      {' '}
      {/* Apply the custom theme to the app */}
      <Router>
        {' '}
        {/* Set up the routing with BrowserRouter */}
        <Routes>
          {' '}
          {/* Define the routes for the app */}
          <Route
            path="/"
            element={
              <LoggedIn>
                <Login />
              </LoggedIn>
            }
          />{' '}
          {/* Display the Login component for the root path if a user is not logged in */}
          <Route path="/" element={<Home />} /> {/* Display the Home component for the root path */}
          <Route path="/home" element={<Home />} />{' '}
          {/* Display the Home component for the '/home' path */}
          {/* --------------------------------------------------------- */}
          {/* Transport Management */}
          <Route path="/transport-management" element={<ViewIncomePage />} />{' '}
          {/* Display the ViewIncomePage component for the '/transport-management' path */}
          <Route path="/transport-management/add-income" element={<AddIncome />} />{' '}
          {/* Display the AddIncome component for the '/transport-management/add-income' path */}
          <Route path="/transport-management/edit-income/:id" element={<EditIncomePage />} />{' '}
          {/* Display the EditIncomePage component for the '/transport-management/edit-income/:id' path */}
          <Route path="/transport-management/inspector" element={<ViewInspector />} />{' '}
          {/* Display the ViewInspector component for the '/transport-management/inspector' path */}
          <Route path="/transport-management/add-inspector" element={<AddInspector />} />{' '}
          {/* Display the AddInspector component for the '/transport-management/add-inspector' path */}
          <Route path="/transport-management/edit-inspector/:id" element={<EditInspector />} />{' '}
          {/* Display the EditInspector component for the '/transport-management/edit-inspector/:id' path */}
          <Route path="/transport-management/schedule" element={<ViewSchedule />} />{' '}
          {/* Display the ViewSchedule component for the '/transport-management/schedule' path */}
          <Route path="/transport-management/add-schedule" element={<AddSchedule />} />{' '}
          {/* Display the AddSchedule component for the '/transport-management/add-schedule' path */}
          <Route path="/transport-management/edit-schedule/:id" element={<EditSchedule />} />{' '}
          {/* Display the EditSchedule component for the '/transport-management/edit-schedule/:id' path */}
          <Route path="/transport-management/route" element={<ViewRoute />} />{' '}
          {/* Display the ViewRoute component for the '/transport-management/route' path */}
          <Route path="/transport-management/add-route" element={<AddRoute />} />{' '}
          {/* Display the AddRoute component for the '/transport-management/add-route' path */}
          <Route path="/transport-management/edit-route/:id" element={<EditRoute />} />{' '}
          {/* Display the EditRoute component for the '/transport-management/edit-route/:id' path */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; // Export the App component as the default export

// const LoggedOut = ({ children }) => {
//   if (localStorage.getItem('token')) {
//     return children;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

// Define a component to handle the case when a user is logged in
export const LoggedIn = ({ children }) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />; // Redirect to the Home page if the user is logged in
  } else {
    return children; // Render the children components if the user is not logged in
  }
};
