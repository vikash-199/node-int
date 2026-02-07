import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', {
        email,
        password,
      });
      alert('succesfull signup.');
    } catch (err) {
      console.log(err);
      alert('Signup failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>

        <input
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
