import React from 'react';
import ReactDOM from 'react-dom/client';
import Project from './components/project.js';
import './css/styles.css';
import './js/scripts.js';
import Home from './components/home.js';
import Contact from './components/contact.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './components/about.js';
import AdminPage from './components/AdminPage.js';
import Login from './components/Login.js';
import { AuthProvider } from './components/authContext.js';
import ProjectCategories from './components/ProjectCategories.js';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div id="app" className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path='/projects' element={<Project />}></Route>
              <Route path='/contact' element={<Contact />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/categories' element={<ProjectCategories/>}/>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/admin' element={<AdminPage />}></Route>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

