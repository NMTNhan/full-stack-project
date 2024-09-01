import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import UserPage from './pages/UserPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import Group from './pages/Group';
import AboutUsPage from './pages/AboutUsPage';
import MembersPage from './pages/MembersPage';
import FriendProfile from './pages/FriendProfile';
import {createContext, useEffect, useState} from "react";
import {NotFoundPage} from "./pages/NotFoundPage";

export const UserContext = createContext(undefined)

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [groups, setGroups] = useState([]); // State to hold fetched groups
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups');
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
        const data = await response.json();
        setGroups(data); // Assuming data is an array of groups
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
    localStorage.setItem('user', JSON.stringify(user));
  }, [groups, user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }


  return (
      <UserContext.Provider value={{ user, setUser}}>
          <Router>
              <Routes>
                  <Route path="/homepage" element={<HomePage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  {/* <Route path="/user" element={<UserPage />} /> */}
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/userprofile" element={<UserProfile />} />
                  <Route path="/friend/:friendID" element={<FriendProfile />} />
                  {groups.map(group => (
                      <Route
                          key={group._id}
                          path={`/Group/:groupId`}
                          element={<Group />}
                      />
                  ))}
                  {groups.map(group => (
                      <Route
                          key={group._id}
                          path={`/aboutus/:groupId`}
                          element={<AboutUsPage />}
                      />
                  ))}
                  {groups.map(group => (
                      <Route
                          key={group._id}
                          path={`/groupmembers/:groupId`} // Correct path with leading slash
                          element={<MembersPage />}
                      />
                  ))}
                  <Route path={'*'} element={<NotFoundPage/>}/>
              </Routes>
          </Router>
      </UserContext.Provider>
  );
}

export default App;