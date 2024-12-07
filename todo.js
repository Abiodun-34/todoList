// Select elements
const addTaskForm = document.getElementById('add-task-form');
const taskList = document.getElementById('tasks');
const userProfileSection = document.getElementById('user-profile');
const userNameDisplay = document.getElementById('user-name');
const authSection = document.getElementById('auth-section');
const logoutButton = document.getElementById('logout-button');


// Check if a user is logged in
const savedUser = JSON.parse(localStorage.getItem('user'));

if (savedUser) {
  // If logged in, display user profile and set username
  userNameElement.textContent = savedUser.username || 'Guest';
  userProfileSection.style.display = 'block';
} else {
  // If not logged in, hide user profile
  userProfileSection.style.display = 'none';
}

// Function to load tasks from localStorage
const loadTasks = () => {
  const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  currentTasks.forEach(task => {
    addTaskToDOM(task-title, task-date, task-time, task-notes);
  });
};

// Function to add a task to the DOM
const addTaskToDOM = (title, date, time, notes) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.innerHTML = `
    <div>
      <strong>${title}</strong><br>
      ${date} at ${time}<br>
      ${notes}
    </div>
    <button class="delete-task">Delete</button>
  `;

  // Add delete functionality
  taskItem.querySelector('.delete-task').addEventListener('click', () => {
    taskItem.remove();
    // Remove task from localStorage
    removeTaskFromStorage(title);
  });

  // Append task to the list
  taskList.appendChild(taskItem);
};

// Add Event Listener for Form Submission
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page refresh

  // Get form values
  const title = document.getElementById('task-title').value.trim();
  const date = document.getElementById('task-date').value.trim();
  const time = document.getElementById('task-time').value.trim();
  const notes = document.getElementById('task-notes').value.trim();

  if (!title || !date || !time || !notes) {
    alert('Please fill in all fields!');
    return;
  }

  // Add task to the DOM
  addTaskToDOM(title, date, time, notes);

  // Save task to localStorage
  const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  currentTasks.push({ title, date, time, notes });
  localStorage.setItem('tasks', JSON.stringify(currentTasks));

  // Notify user
  alert('Task added successfully!');

  // Clear the form
  addTaskForm.reset();
});

// Remove task from localStorage
const removeTaskFromStorage = (title) => {
  const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = currentTasks.filter(task => task.title !== title);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

// Handle logout functionality
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    // Clear the logged-in user data
    localStorage.removeItem('user');
    alert('You have been logged out.');
    // Redirect or reload to login page
    userProfileSection.style.display = 'none';
    authSection.style.display = 'block';
  });
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
