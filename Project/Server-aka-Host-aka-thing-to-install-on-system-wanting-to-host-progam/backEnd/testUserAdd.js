const axios = require('axios');

// Data for the new user
const userData = {
  username: 'admin',
  password: 'admin',
  actualName: 'admin',
  isAdmin: true,
  isPremium: true
};

// URL of the register route
const registerUrl = 'http://localhost:8000/auth/register';  // Adjust the URL based on your server configuration

// Function to register a new user
async function registerUser() {
  try {
    const response = await axios.post(registerUrl, userData);
    console.log(response.data.message); // Logs success message
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
  }
}

// Call the function to register the user
registerUser();
