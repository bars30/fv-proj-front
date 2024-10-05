// Check for the token in local storage on page load
window.onload = function() {
  const token = localStorage.getItem('token'); // Check if token exists
  if (token) {
    window.location.href = './home.html'; // Redirect if token found
  }
};

async function register() {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  console.log(JSON.stringify({ email, password }));

  const url = "https://fvproj-back-6i3x.vercel.app/register"; // Your register endpoint
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Registration failed: ${errorData.error}`);
    }

    const json = await response.json();
    console.log('Registration successful:', json);
    alert('Registration successful! User ID: ' + json.userId);
    localStorage.setItem('token', json.token); // Save token in local storage
    localStorage.setItem('email', email);
    window.location.href = './home.html'; // Redirect to home after registration
  } catch (error) {
    console.error(error.message);
    alert(error.message); // Display error to user
  }
}

async function getData() {
  const url = "https://fvproj-back-6i3x.vercel.app/data";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

async function getData2() {
  const url = "https://fvproj-back-6i3x.vercel.app/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const url = "https://fvproj-back-6i3x.vercel.app/login"; // Your login endpoint
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.error}`);
    }

    const json = await response.json();
    console.log('Login successful:', json);
    alert('Login successful! Token: ' + json.token);
    localStorage.setItem('token', json.token); // Save token in local storage
    localStorage.setItem('email', email);
    window.location.href = './home.html'; // Redirect to home after login
  } catch (error) {
    console.error(error.message);
    alert(error.message); // Display error to user
  }
}

// Call the function to fetch and print the data
getData();
getData2();
