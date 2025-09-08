import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9mf3ra24HBI4gw5O2DF1Gr788hiiQ1Ws",
  authDomain: "ayush-d7ac2.firebaseapp.com",
  projectId: "ayush-d7ac2",
  storageBucket: "ayush-d7ac2.firebasestorage.app",
  messagingSenderId: "41938729149",
  appId: "1:41938729149:web:c69cd908564b5d5d229fd4",
  measurementId: "G-K49PQS1CHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleAuthChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, authData.email, authData.password);
      setShowSignIn(false);
      setAuthData({ name: '', email: '', password: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: authData.name,
        email: authData.email,
        createdAt: new Date()
      });
      setShowSignUp(false);
      setAuthData({ name: '', email: '', password: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Check if user is new
      if (result._tokenResponse.isNewUser) {
        await setDoc(doc(db, 'users', result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          createdAt: new Date()
        });
      }
      setShowSignIn(false);
      setShowSignUp(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="auth-buttons">
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.displayName || user.email}</span>
            <button className="auth-btn" onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <>
            <button className="auth-btn" onClick={() => setShowSignIn(true)}>Sign In</button>
            <button className="auth-btn" onClick={() => setShowSignUp(true)}>Sign Up</button>
          </>
        )}
      </div>

      <Header />
      
      <div className="main-container">
        <MainContent />
      </div>
      
      <EnhancedFooter />

      {/* Sign In Modal */}
      {showSignIn && (
        <AuthModal 
          type="signin" 
          onClose={() => setShowSignIn(false)} 
          onAuthChange={handleAuthChange}
          onSubmit={handleSignIn}
          onGoogleAuth={handleGoogleSignIn}
          onSwitch={() => { setShowSignIn(false); setShowSignUp(true); }}
          authData={authData}
        />
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <AuthModal 
          type="signup" 
          onClose={() => setShowSignUp(false)} 
          onAuthChange={handleAuthChange}
          onSubmit={handleSignUp}
          onGoogleAuth={handleGoogleSignIn}
          onSwitch={() => { setShowSignUp(false); setShowSignIn(true); }}
          authData={authData}
        />
      )}
    </div>
  );
}

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div className="portal-title">NAMASTE PORTAL</div>
        <div className="portal-subtitle">MATERIAL AYUSH MORBETTY AND STANDARDED TERMINOLOGIES ELECTRONIC PORTAL</div>
        
        <nav>
          <a href="#about">About</a>
          <a href="#morbidity">Morbidity Cookies</a>
          <a href="#standard">Standard Terms</a>
          <a href="#earthsearch">Dashboards Gallery Identification Program</a>
        </nav>
      </div>
    </header>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="left-column">
        <h2>WHO-ICD-II Codes</h2>
        
        <div className="tool-buttons">
          <button className="tool-btn">Embedded Browser</button>
          <button className="tool-btn">Embedded Coding Tool</button>
          <button className="tool-btn">WHO-FIC</button>
          <button className="tool-btn">ICD-II Coding Tool</button>
        </div>
        
        <CodingTool />
        
        <DivisionList />
        
        <hr />
        
        <h2>ICD-I 1 for Mentality and Mobility Statistics</h2>
        
        <h3>Ipc. docs. ncns.</h3>
      </div>
      
      <div className="right-column">
        <QuickLinks />
        <SupportInfo />
        <CustomerInfo />
      </div>
    </div>
  );
};

const CodingTool = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement search functionality here
  };

  return (
    <table className="coding-table">
      <thead>
        <tr>
          <th>HTML</th>
          <th>ID</th>
          <th>Method</th>
          <th>ICD-II Coding Tool</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Type for coding the search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const DivisionList = () => {
  const divisions = [
    "ICD-I 1 for Mentality and Mobility Statistics",
    "BI Circuit infections or parasitic diseases",
    "Bd Modellosis",
    "BI Diseases of the blood or blood-flowing organs",
    "BI Diseases of the immune system",
    "Bd Disorders, nutritional or metabolic diseases",
    "BI Mental, behavioural or neurodevelopmental disorders",
    "BI Sleep valve disorders",
    "BI Diseases of the nervous system",
    "BI Diseases of the visual system",
    "BI Diseases of the ear or mandated process",
    "BI Diseases of the circulatory system",
    "BI Diseases of the respiratory system",
    "BI Diseases of the digestive system",
    "BI Diseases of the heart",
    "BI Diseases of the mitochondrial system or connective tissue"
  ];

  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <ul className="division-list">
      {divisions.map((division, index) => (
        <li 
          key={index} 
          className={expandedItems[index] ? 'expanded' : ''}
          onClick={() => toggleItem(index)}
        >
          {expandedItems[index] ? '▼' : '►'} {division}
        </li>
      ))}
    </ul>
  );
};

const QuickLinks = () => {
  const links = [
    "Ministry of AYUSH",
    "MoHFW",
    "User Manual",
    "Contact Us"
  ];

  return (
    <div className="quick-links">
      <h3>Quick Links</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a></li>
        ))}
      </ul>
    </div>
  );
};

const SupportInfo = () => {
  const items = [
    "Ayurveda",
    "Unani",
    "Homeopathy",
    "Yoga & Naturopathy",
    "Siddha",
    "Digital Helpline for Ayurveda Research Articles (DHARA)"
  ];

  return (
    <div className="support-info">
      <h3>Supportive Informations</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}><a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a></li>
        ))}
      </ul>
    </div>
  );
};

const CustomerInfo = () => {
  return (
    <div className="customer-info">
      <h3>Government of India</h3>
      <h4>Ministry of Ayush</h4>
      <div className="disclaimer">
        <p><strong>DISCLAIMER-I:</strong> The NAMASTE Portal developed by Ministry of AYUSH, provides information about Standardised terminologies and Morbidity Codes along with dedicated data entry module for updating morbidity statistics in consolidated form as well as on real time basis. The launch of this portal is a landmark event in the history of AYUSH with a promise to bring in equity with mainstream health care system.</p>
      </div>
    </div>
  );
};

const EnhancedFooter = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Ministry of AYUSH</a></li>
            <li><a href="#">MoHFW</a></li>
            <li><a href="#">User Manual</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>AYUSH Systems</h4>
          <ul>
            <li><a href="#">Ayurveda</a></li>
            <li><a href="#">Unani</a></li>
            <li><a href="#">Homeopathy</a></li>
            <li><a href="#">Yoga & Naturopathy</a></li>
            <li><a href="#">Siddha</a></li>
            <li><a href="#">Digital Helpline for Ayurveda Research Articles (DHARA)</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Information</h4>
          <p>Ministry of Ayush, Government of India</p>
          <p>Email: info@ayush.gov.in</p>
          <p>Phone: +91-11-12345678</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Website content owned by Ministry of Ayush, Government of India. Designed, developed and maintained by BISAG-N, Meity-GOI</p>
        <p>LAST UPDATE VERSION: [29-AUGUST-2025 5:30 PM], VISITORS COUNT: 1570566</p>
      </div>
    </footer>
  );
};

const AuthModal = ({ type, onClose, onAuthChange, onSubmit, onGoogleAuth, onSwitch, authData }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
        <form className="auth-form" onSubmit={onSubmit}>
          {type === 'signup' && (
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={authData.name}
              onChange={onAuthChange}
              required 
            />
          )}
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={authData.email}
            onChange={onAuthChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={authData.password}
            onChange={onAuthChange}
            required 
          />
          <button type="submit">{type === 'signin' ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <button className="google-btn auth-btn" onClick={onGoogleAuth}>
          {type === 'signin' ? 'Sign In with Google' : 'Sign Up with Google'}
        </button>
        <p className="form-toggle" onClick={onSwitch}>
          {type === 'signin' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
        </p>
      </div>
    </div>
  );
};

export default App;