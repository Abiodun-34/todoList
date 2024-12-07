const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Retrieve input values
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();

  // Validate input fields
  if (!username || !email || !password) {
    alert('Please fill in all fields!');
    return;
  }

  // Retrieve existing users or initialize an empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if email is already registered
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert('Email already registered. Please log in.');
    return;
  }

  // Create user data object
  const userData = { username, email, password };

  // Add the new user to the array and save it to localStorage
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));

  console.log('User registered:', userData); // Debug log
  alert('Registration successful! Please log in.');

  // Reset the form
  registerForm.reset();
});
