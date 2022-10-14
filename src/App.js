import "./App.css";
import moonIcon from "./assets/icon-moon.svg";
import sunIcon from "./assets/icon-sun.svg";
import searchIcon from "./assets/icon-search.svg";
import { useEffect, useState } from "react";
import UserPreview from "./components/UserPreview";
import axios from "axios";
import { useRef } from "react";
function App() {
  const [darktheme, setDarktheme] = useState(false);
  const [userName, setUserName] = useState("octocat");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${userName}`
        );
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchdata();
  }, [userName]);

  const handleKeyPress = (event) => {
    if (event?.key === "Enter" && inputRef.current.value) {
      setUserName(inputRef.current.value);
    }
  };

  const setUser = () => {
    setUserName(inputRef.current.value);
  };
  return (
    <div className={darktheme ? "App darktheme" : "App"}>
      <div className="app-wrapper">
        <div className="header-modeC">
          <h1>devfinder</h1>
          <div
            onClick={() => setDarktheme(!darktheme)}
            className="mode-control"
          >
            {darktheme ? "LIGHT" : "DARK"}
            <span>
              <img src={darktheme ? sunIcon : moonIcon} alt="theme-icon" />
            </span>
          </div>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search GitHub username..."
            ref={inputRef}
            onKeyPress={(event) => handleKeyPress(event)}
          />
          <img src={searchIcon} alt="search-icon" className="search-icon" />
          <button className="search-button" onClick={() => setUser()}>
            Search
          </button>
          {error && <div className="error">No results</div>}
        </div>
        {loading ? (
          <div className="loading-box">loading...</div>
        ) : (
          <UserPreview data={userData} />
        )}
      </div>
    </div>
  );
}

export default App;
