require('dotenv').config();
const jwt = require('jsonwebtoken');

// Ensure the secret key is defined
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not set in the environment variables.");
}

/**
 * Generate a JWT with the given payload and options.
 * 
 * @param {Object} payload - Data to encode in the token (e.g., user ID, email).
 * @param {Object} options - Token options (e.g., expiration time).
 * @returns {string} - The generated JWT.
 */
const generateToken = (payload, options = { expiresIn: '10d' }) => {
  try {
    return jwt.sign(payload, secret, options);
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw error; // Rethrow error for the caller to handle
  }
};
console.log("Secret Key:", secret);
// Example usage
if (require.main === module) {
  // Generate a sample token if the script is run directly
  const samplePayload = { id: '123098', email: 'sanju@gmail.com' };
  const token = generateToken(samplePayload);
  console.log('Generated JWT:', token);
}

module.exports = generateToken;

