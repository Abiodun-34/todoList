document.addEventListener('DOMContentLoaded', () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.length === 0) {
    // No registered users found
    alert('No registered users found. Please register first!');
    window.location.href = 'reg.todo.html'; // Redirect to the registration page
  }
});

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // Retrieve user data from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Validate user credentials
  const savedUser = users.find(user => user.email === email && user.password === password);

  if (savedUser) {
    alert('Login successful!');
    
    // Save current session in localStorage
    localStorage.setItem('currentUser', JSON.stringify(savedUser));

    // Redirect to the to-do list page
    window.location.href = 'todoList.html';
  } else {
    alert('Invalid email or password!');
  }
});
