const cors = require("cors");

const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      if (
        !origin || 
        origin.startsWith("http://192.168.") || 
        origin.startsWith("http://localhost")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });
};

module.exports = corsConfig;