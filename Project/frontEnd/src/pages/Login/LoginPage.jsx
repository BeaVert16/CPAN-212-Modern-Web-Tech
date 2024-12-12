import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { IsLoggedInContext } from "../../auth/IsLoggedInCheck";
import LoadingCat from "../../Global/LoadingCat/LoadingCat";
import { ipadd } from "../../url";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useContext(IsLoggedInContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${ipadd}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        await checkAuth();
        navigate("/");
      } else {
        console.error("Login failed:", result);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <h1>Monitor Cat</h1>
        <div className="image">
          <img className="logo" src="/Images/OGCatLong.png" alt="BongoCatto" />
        </div>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Username:
            <input
              name="username"
              type="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <span className="error-box">{errors.username}</span>
            )}
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error-box">{errors.password}</span>
            )}
          </label>
          <button type="submit" className="login" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {isLoading && (
          <div className="loading-overlay">
            <LoadingCat />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
