import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import Group from './pages/Group';
import FriendProfile from './pages/FriendProfile';
import AboutUsPage from './pages/AboutUsPage';
import MembersPage from './pages/MembersPage';
import { createContext, useEffect, useState } from "react";
import { NotFoundPage } from "./pages/NotFoundPage";
import CreateGroupPage from './pages/CreateGroupPage';

export const UserContext = createContext(undefined);

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/friend/:friendID" element={<FriendProfile />} />
          <Route path="/group/:groupID" element={<Group />} />
          <Route path="/members/:groupID" element={<MembersPage />} />
          <Route path="/aboutus/:groupID" element={<AboutUsPage />} />
          <Route path="/creategroup" element={<CreateGroupPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
