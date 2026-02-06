import jwt from 'jsonwebtoken';

export const veryfyToken = (req, res, next) => {
  try {
    //get token from the header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token missing' });
    }

    //extracting token
    const token = authHeader.split(' ')[1];

    //veryfy token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoded is the data that you put in jwt dring creation

    //attached the decoded user data to the req body
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
