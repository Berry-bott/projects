
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import togglePassword from "./register.js";
import { openPopup, closePopup } from "./popup.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEgR134K-jlERV8TkR7J9tS7QZ2A8MumU",
    authDomain: "snap-project-deploy.firebaseapp.com",
    projectId: "snap-project-deploy",
    storageBucket: "snap-project-deploy.appspot.com",
    messagingSenderId: "1072535964803",
    appId: "1:1072535964803:web:399f87f7f09e3c9f421fb6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const auth = getAuth();

let username = document.getElementById('username');
let emailField = document.getElementById('email');
let passwordField = document.getElementById('password');
let checkbox = document.getElementById('checkbox');
let form = document.getElementById("form");

const errorMessages = {
    username: document.getElementById('error1'),
    email: document.getElementById('error2'),
    password: document.getElementById('error3'),
    checkbox: document.getElementById('error4')
};
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    let fields = [
        { input: username, error: errorMessages.username, message: "Username is required" },
        { input: emailField, error: errorMessages.email, message: "Email is required" },
        { input: passwordField, error: errorMessages.password, message: "Password is required" }
    ];
    // Check if fields are empty
    fields.forEach(field => {
        if (field.input.value.trim() === "") {
            field.error.innerText = field.message;
            field.error.style.color = "red";
            isValid = false;
        } else {
            field.error.innerText = "";
        }
    });
    // Checkbox validation (must be checked)
    if (!checkbox.checked) {
        errorMessages.checkbox.innerText = "You must agree to the terms";
        errorMessages.checkbox.style.color = "red";
        isValid = false;
    } else {
        errorMessages.checkbox.innerText = "";
    }
    if (!isValid) return;
    // Firebase Authentication Logic
    try {
        const email = emailField.value;  // Fetch email input
        const password = passwordField.value;  // Fetch password input
        // togglePassword();
        const userName = `${username.value}`;
        //  Save full name in sessionStorage
        sessionStorage.setItem("username", userName);
        // console.log("Saved Name:", userName);
        let userNames = sessionStorage.getItem('username');
        console.log(userNames);
        let fullName = sessionStorage.getItem('fullName');
        console.log(fullName);
        if (fullName === userNames || fullName == null) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Ensure the user has verified their email before allowing login
            if (user.emailVerified) {
                openPopup(`Login Successful!  
                            Redirecting to home...` );
                document.querySelectorAll('.close-btn, .modal-overlay').forEach(element => {
                    element.addEventListener('click', () => {
                     
                        window.location.href = "home.html"; // Redirect on OK click
                    });
                });

            } else {
                openPopup(`Please verify your email before logging in.`)
            }
        } else {
            errorMessages.username.innerHTML = `Username mismatch`;
            errorMessages.username.style.color = "red";
        }
    }
    catch (error) {
        let message;
        message = `Invalid Login: Check if Username, Email and Passwords are correct  ${error.message} `;
        if (error.message === "auth/user-not-found") {
            message = "User not found. Please register first.";
        } else if (error.message === "auth/wrong-password") {
            message = "Incorrect password. Try again.";
        } else if (error.code === "auth/invalid-email") {
            message = "Invalid email format.";
        }
         else if (error.code === "auth/network-request-failed") {
            message = "Please Connect To The Internet";
        }
        openPopup(message); // Show the correct error message
        console.error(error.code, error.message);
    }
});

