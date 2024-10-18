import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faUser,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  //allows for the storage of data gathered from the apis
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [overview, setOverview] = useState([]);
  const [information, setInformation] = useState([]);

  //----------------------GETS THE DATA FROM ALL THE API ENDPOINTS----------------------//
  const fetchEducation = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getEdu");
      const data = await response.json();
      setEducation(data);
    } catch (error) {
      console.error("Error fetching Education data:", error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getExp");
      const data = await response.json();
      setExperience(data);
    } catch (error) {
      console.error("Error fetching Experience data:", error);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getOverview");
      const data = await response.json();
      setOverview(data);
    } catch (error) {
      console.error("Error fetching Overview data:", error);
    }
  };

  const fetchInformation = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getInformation");
      const data = await response.json();
      if (data.length > 0) {
        setInformation(data[0]);
      }
    } catch (error) {
      console.error("Error fetching Information data:", error);
    }
  };
  //------------------------------------------------------------------------------------//

  useEffect(() => {
    fetchEducation();
    fetchExperience();
    fetchOverview();
    fetchInformation();
  }, []);

  return (
    <>
      <div className="resume-container">
        <div className="left-panel">
          <img
            src="/src/assets/BongoCat.png"
            alt="Profile"
            className="profile-picture"
          />
          <h2>{information.Name}</h2>
          <p>
            {/* used to open a new tab to display Vaughan area on google maps */}
            <a
              href="https://maps.app.goo.gl/c2G5VnJtmgwT31JDA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {information.Location}
            </a>
          </p>
          <p>
            {/* used to open a new tab to display Humber on google maps */}
            <a
              href="https://maps.app.goo.gl/sKfW5HXQ5UtXNei49"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faUser} /> {information.Occupation}
            </a>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> {information.PhoneNum}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> {information.Email}
          </p>
          <p>
            {/* used to open a new tab to direct to github account*/}
            <a
              href={information.GitHub}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
          </p>
        </div>
        <div className="right-panel">
          <div className="section">
            <h2>Overview</h2>

            {/* used to call the api again to reload data without having to reload page, added because why not and probably going to add it to my project so practice */}
            <FontAwesomeIcon
              icon={faSyncAlt}
              onClick={fetchOverview}
              className="reload-button"
            />
            {overview.map((item, index) => (
              <p key={index}>{item.Description}</p>
            ))}
          </div>
          <div className="section">
            <h2>Education</h2>

            {/* used to call the api again to reload data without having to reload page, added because why not and probably going to add it to my project so practice */}
            <FontAwesomeIcon
              icon={faSyncAlt}
              onClick={fetchEducation}
              className="reload-button"
            />
            {education.map((item, index) => (
              <div key={index} className="section-content">
                <h3>
                  {item.Degree} in {item.Program}
                </h3>
                <p>
                  {item.Institution},{" "}
                  <span
                    className={item.Year === "Current" ? "current-year" : ""}
                  >
                    {item.Year}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="section">
            <h2>Experience</h2>

            {/* used to call the api again to reload data without having to reload page, added because why not and probably going to add it to my project so practice */}
            <FontAwesomeIcon
              icon={faSyncAlt}
              onClick={fetchExperience}
              className="reload-button"
            />
            {experience.map((item, index) => (
              <div key={index} className="section-content">
                <h3>
                  {item.Title} at {item.Place}
                </h3>
                <p>{item.Description}</p>
                <p
                  className={
                    item.Year.includes("Present") ? "current-year" : ""
                  }
                >
                  {item.Year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
