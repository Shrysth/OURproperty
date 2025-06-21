export const loginUser = async (email, password) => {
  try {
    const res = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(res.status === 401 ? 'Invalid email or password' : 'Login failed');
    }

    const data = await res.json();
    return { success: true, token: data.accessToken };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  
  if (!email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';

  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};