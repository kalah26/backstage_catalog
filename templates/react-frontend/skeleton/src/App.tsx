import React, { useState, useEffect } from 'react'
{% if values.enableRouting %}
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
{% endif %}
{% if values.enableAuth %}
import { AuthProvider, useAuth } from './contexts/AuthContext'
{% endif %}
import { ApiProvider } from './contexts/ApiContext'
import Home from './pages/Home'
{% if values.enableAuth %}
import Login from './pages/Login'
import Profile from './pages/Profile'
{% endif %}
{% if values.uiLibrary == 'tailwind' %}
import './App.css'
{% endif %}

function App() {
  return (
    {% if values.enableAuth %}
    <AuthProvider>
    {% endif %}
    <ApiProvider>
      {% if values.enableRouting %}
      <Router>
        <div className="App">
          <nav className="{% if values.uiLibrary == 'tailwind' %}bg-blue-600 text-white p-4{% else %}navigation{% endif %}">
            <div className="{% if values.uiLibrary == 'tailwind' %}container mx-auto flex justify-between items-center{% else %}nav-container{% endif %}">
              <Link to="/" className="{% if values.uiLibrary == 'tailwind' %}text-2xl font-bold{% else %}logo{% endif %}">
                ${{ values.name }}
              </Link>
              <div className="{% if values.uiLibrary == 'tailwind' %}space-x-4{% else %}nav-links{% endif %}">
                <Link to="/" className="{% if values.uiLibrary == 'tailwind' %}hover:text-blue-200{% else %}nav-link{% endif %}">
                  Home
                </Link>
                {% if values.enableAuth %}
                <AuthNavigation />
                {% endif %}
              </div>
            </div>
          </nav>
          
          <main className="{% if values.uiLibrary == 'tailwind' %}container mx-auto p-4{% else %}main-content{% endif %}">
            <Routes>
              <Route path="/" element={<Home />} />
              {% if values.enableAuth %}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              {% endif %}
            </Routes>
          </main>
        </div>
      </Router>
      {% else %}
      <div className="App">
        <header className="{% if values.uiLibrary == 'tailwind' %}bg-blue-600 text-white p-6 text-center{% else %}app-header{% endif %}">
          <h1 className="{% if values.uiLibrary == 'tailwind' %}text-3xl font-bold{% else %}title{% endif %}">
            ${{ values.name }}
          </h1>
          <p className="{% if values.uiLibrary == 'tailwind' %}text-blue-100 mt-2{% else %}subtitle{% endif %}">
            ${{ values.description }}
          </p>
        </header>
        
        <main className="{% if values.uiLibrary == 'tailwind' %}container mx-auto p-8{% else %}main-content{% endif %}">
          <Home />
        </main>
      </div>
      {% endif %}
    </ApiProvider>
    {% if values.enableAuth %}
    </AuthProvider>
    {% endif %}
  )
}

{% if values.enableAuth and values.enableRouting %}
function AuthNavigation() {
  const { user, logout } = useAuth()
  
  if (user) {
    return (
      <>
        <Link to="/profile" className="{% if values.uiLibrary == 'tailwind' %}hover:text-blue-200{% else %}nav-link{% endif %}">
          Profile
        </Link>
        <button
          onClick={logout}
          className="{% if values.uiLibrary == 'tailwind' %}hover:text-blue-200 bg-transparent border-none cursor-pointer{% else %}nav-link logout-btn{% endif %}"
        >
          Logout
        </button>
      </>
    )
  }
  
  return (
    <Link to="/login" className="{% if values.uiLibrary == 'tailwind' %}hover:text-blue-200{% else %}nav-link{% endif %}">
      Login
    </Link>
  )
}
{% endif %}

export default App
