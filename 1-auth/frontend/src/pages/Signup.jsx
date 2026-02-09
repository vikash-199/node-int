import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signup',
        { email, password },
        { withCredentials: true },
      );

      console.log('STATUS:', response.status);
      alert('successful signup');
    } catch (err) {
      console.log('ERROR STATUS:', err.response?.status);
      console.log('FULL ERROR:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          name="email"
          type="text"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>

        <input
          name="password"
          type="text"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign UP</button>
      </form>
    </div>
  );
}

export default Signup;
