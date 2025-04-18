const users = {};
function register(username, password) {
    if (users[username]) {
        console.log("Username already exists. Please choose a different username.");
        return false;
    } else {
        users[username] = password;
        console.log("Registration successful!");
        window.location.href = "/login.html";
        return true;
    }
}
async function registerUser(userData) {
	try {
		const response = await fetch('/register', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		console.log('Registration successful:', result);
	} catch (error) {
		console.error('Error during registration:', error);
	}
}
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    return usernameRegex.test(username);
}
function validateForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!validateUsername(username)) {
        alert("Invalid username. It must be at least 3 characters long and contain only letters and numbers.");
        return false;
    }
    if (!validatePassword(password)) {
        alert("Invalid password. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}