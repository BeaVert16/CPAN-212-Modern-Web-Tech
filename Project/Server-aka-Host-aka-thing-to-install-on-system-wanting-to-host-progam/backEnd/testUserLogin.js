const axios = require('axios');

// Login credentials
const loginData = {
  username: 'newuser123',   // Username (or email if you're using email for login)
  password: 'securePassword123'  // User's password
};

// URL of the login route
const loginUrl = 'http://localhost:8000/auth/login';  // Adjust the URL based on your server configuration

// Function to login a user
async function loginUser() {
  try {
    const response = await axios.post(loginUrl, loginData);
    console.log(response.data.message); // Logs success message
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
  }
}

// Call the function to login
loginUser();
