const users = {};
function login(username, password) {
    if (users[username] && users[username] === password) {
        console.log("Login successful!");
        return true;
    } else {
        console.log("Invalid username or password.");
        return false;
    }
}