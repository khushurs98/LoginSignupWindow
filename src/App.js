// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import UserManagement from "./components/UserManagement";
import AdminManagement from "./components/RoleManagement";
import Modal from "./components/Modal";  // Modal for password reset
import LoginPage from "./components/LoginPage";  // Login and signup components

function App() {
  const { isAuthenticated, role, login, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div className="main">
        {/* Login / Signup Routing */}
        <Switch>
          <Route exact path="/">
            {!isAuthenticated ? <LoginPage login={login} /> : <Redirect to={`/${role}-management`} />}
          </Route>

          {/* Role-based routes */}
          <Route path="/user-management">
            {isAuthenticated && role === 'user' ? <UserManagement /> : <Redirect to="/" />}
          </Route>
          
          <Route path="/admin-management">
            {isAuthenticated && role === 'admin' ? <AdminManagement /> : <Redirect to="/" />}
          </Route>

          {/* If no route matches, redirect to login */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

        {/* Modal for password reset */}
        {showModal && <Modal closeModal={closeModal} />}
      </div>
    </Router>
  );
}

export default App;
