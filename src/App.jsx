import { createContext, useState, useContext, useEffect } from 'react'
import lightIcon from '../public/assets/images/icon-moon.svg'
import darkIcon from '../public/assets/images/icon-sun.svg'
import logo from '../public/assets/images/logo.svg'
import './App.css'

const ThemeContext = createContext()

function ExtensionList({ extension }){
  return (
 <div className="extension-card">
      <div className="card-header">
        <img src={extension.icon} alt={extension.name} className="extension-icon" />
        <div className="card-info">
          <h3 className="card-title">{extension.name}</h3>
          <p className="card-description">{extension.description}</p>
        </div>
      </div>
      <div className="card-footer">
        <button className="remove-btn">Remove</button>
        <button className="toggle-switch" />
      </div>
    </div>
  )
}

function Header(){
  const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <header className="header">
      <span><img src={logo} alt="Logo" /></span>
      <button onClick={toggleTheme}><img src={theme === "light" ? lightIcon : darkIcon} alt="Toggle theme" /></button>
    </header>
  )
}

function Main(){
  const [extensions, setExtensions] = useState([])

  useEffect(() => {
    fetch('/extensions.json')
      .then(res => res.json())
      .then(data => {
        setExtensions(data.extensions)
      })
      .catch(err => console.error('Error loading extensions:', err))
  }, [])

  return (
    <div className="container">
      <div className="list-header">
        <h1 className="list-title">Extensions List</h1>
      </div> 

      <div className="extensions-grid">
        {extensions.map(extension => (
          <ExtensionList 
            key={extension.id} 
            extension={extension} 
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState("light")

  function toggleTheme(){
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
      <Header />
      <Main />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
