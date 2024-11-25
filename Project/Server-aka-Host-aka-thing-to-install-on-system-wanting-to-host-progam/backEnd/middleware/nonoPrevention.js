const xss = require('xss');
const sqlstring = require('sqlstring');

const nonoPrevention = (req, res, next) => {
  // Function to sanitize strings to prevent XSS and SQL injections
  const sanitize = (data) => {
    if (typeof data === 'string') {
      // Sanitize to prevent XSS (Cross-Site Scripting) attacks
      return xss(sqlstring.escape(data));  // Escapes SQL and sanitizes XSS
    }

    if (typeof data === 'object') {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = sanitize(data[key]);  // Recursively sanitize each field
        }
      }
    }

    return data;
  };

  // Sanitize the body, query params, and headers
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.headers = sanitize(req.headers);

  // Continue to the next middleware or route handler
  next();
};

module.exports = nonoPrevention;
