import "./App.css";

import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import AddPatient from "./pages/AddPatient";
// elements
import Alert from "@mui/material/Alert";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/404";
import Patient from "./pages/Patient";
import ProtectedRoute from "./components/ProtectedRoute";
import SignInSignUpForm from "./pages/SignInSignUpForm";
import Snackbar from "@mui/material/Snackbar";

export const MessageBarContext = createContext();


const App = () => {
  const [messageBar, setMessageBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "success", // Add severity property
    message: "", // Add message property
  });

  const handleSnackbarClose = () => {
    setMessageBar({ ...messageBar, open: false });
  };

  return (
    <MessageBarContext.Provider value={{ messageBar, setMessageBar }}>
      <Routes>
        <Route path="/sign-in" element={<SignInSignUpForm isSignInForm={true} />} />
        <Route path="/sign-up" element={<SignInSignUpForm isSignInForm={false} />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patient />} />
          <Route path="/patient/:patientId?" element={<AddPatient />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={messageBar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={messageBar.severity} sx={{ width: '100%' }}>
          {messageBar.message}
        </Alert>
      </Snackbar>
    </MessageBarContext.Provider>
  );
};

export default App;
