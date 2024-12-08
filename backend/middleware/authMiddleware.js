const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    console.log("-------------------------------------")
    console.log(req.cookies.token)
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }


    // Extract the token value after "Bearer "
    // const token = authHeader.split(' ')[1];

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);

    // Token verification error handling
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    // Generic error response
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = authMiddleware;
