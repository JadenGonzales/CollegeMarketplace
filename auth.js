document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const dbUser1 = process.env.NEXT_PUBLIC_DB_USER1;
    //console.log(dbUser1); // This will log the value of NEXT_PUBLIC_DB_USER1
    //const dbPass1 = import.meta.env.NEXT_PUBLIC_DB_PASS1;
    //console.log(import.meta.env);  // Logs all available environment variables
    const dbPass1 = "password"
    //const dbUser1 = "username"
    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + "; path=/" + expires;
    }

    // Function to get a cookie
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if user is already signed in
    const storedUser = getCookie("username");
    if (storedUser) {
        welcomeMessage.textContent = `Welcome back, ${storedUser}!`;
        loginForm.style.display = "none"; // Hide login form
    }

    // Handle login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple mock authentication (replace with real node service login)
        if ((username === "admin" && password === "password123")||(username === dbUser1 && password === dbPass1)) {
            setCookie("admin", username, 1); // Set cookie for 1 day
            localStorage.setItem("user", username);
            alert("Login successful!");
            location.reload();
        } 
        else {
            alert("Invalid username or password.");
        }
    });
});
