import { openPopup, closePopup } from "./popup.js";
// 🛠️ Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEgR134K-jlERV8TkR7J9tS7QZ2A8MumU",
    authDomain: "snap-project-deploy.firebaseapp.com",
    projectId: "snap-project-deploy",
    storageBucket: "snap-project-deploy.firebasestorage.app",
    messagingSenderId: "1072535964803",
    appId: "1:1072535964803:web:399f87f7f09e3c9f421fb6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

let form = document.getElementById("form");
let fName = document.querySelector("#fName");
let lName = document.querySelector("#lName");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let checkbox = document.querySelector("#checkbox");

const errorMessages = {
    fName: document.getElementById("error1"),
    lName: document.getElementById("error2"),
    username: document.getElementById("error3"),
    email: document.getElementById("error4"),
    password: document.getElementById("error5"),
    checkbox: document.getElementById("error5")
};
// 🛠️ Attach validation to form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    // Fields validation
    let fields = [
        { input: fName, error: errorMessages.fName, message: "First name is required" },
        { input: lName, error: errorMessages.lName, message: "Last name is required" },
        { input: username, error: errorMessages.username, message: "Last name is required" },
        { input: email, error: errorMessages.email, message: "Email is required" },
        { input: password, error: errorMessages.password, message: "Password is required" }
    ];
    fields.forEach(field => {
        let value = field.input.value.trim();
        if (value === "") {
            field.error.innerText = field.message;
            field.error.style.color = "red";
            isValid = false;
        } else {
            field.error.innerText = "";
        }
    });
    // 🛠️ Email format validation
    if (email.value.trim() !== "" && !/^\S+@\S+\.\S+$/.test(email.value)) {
        errorMessages.email.innerText = "Invalid email format";
        errorMessages.email.style.color = "red";
        isValid = false;
    }
    // 🛠️ Password validation: At least one letter, one number, and 6+ characters
    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password.value) && password.value !== "") {
        errorMessages.password.innerText = "Password must contain at least one letter and one number";
        errorMessages.password.style.color = "red";
        isValid = false;
    }
    // 🛠️ Checkbox validation
    if (!checkbox.checked) {
        errorMessages.checkbox.innerText = "You must agree to the terms";
        errorMessages.checkbox.style.color = "red";
        isValid = false;
    } else {
        errorMessages.checkbox.innerText = "";
    }
    // 🚀 If everything is valid, proceed with Firebase signup
    if (isValid) {
        registerUser();
    }
});
// 🚀 Register user function
function registerUser() {
    const auth = getAuth(app);
    const userEmail = email.value;
    const userPassword = password.value;

    const fullName = `${username.value}`;
    // 🔹 Save full name in sessionStorage
    sessionStorage.setItem("fullName", fullName);
    console.log("Saved Name:", fullName);

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            openPopup("Account created successfully!");

            // Send verification email
            sendEmailVerification(user)
                .then(() => {
                    openPopup(`Verification email sent! Please check your inbox.`);
                    document.querySelectorAll('.close-btn, .modal-overlay').forEach(element => {
                        element.addEventListener('click', () => {
                            window.location.href = "signin.html"; // Redirect on OK click
                        });
                    });
                })
                .catch((error) => {
                    openPopup("Error sending verification email: " + error.message);
                });
        })
        .catch((error) => {
            let message;
            message = `Error creating user:  ${error.message} `;
            if (error.code === "auth/network-request-failed") {
                message = "Please Connect To The Internet";
            }
            openPopup(message);
        });
}
let togglePasswordElement = document.querySelector(".toggle-password");

togglePasswordElement.addEventListener("click", function () {
    togglePassword()
});
export default function togglePassword() {
    let passwordInput = document.getElementById("password");

    let svg = togglePasswordElement.querySelector("svg");
    if (passwordInput.type === "password" && svg.classList.contains("fa-eye")) {
        passwordInput.type = "text";
        svg.classList.replace("fa-eye", "fa-eye-slash"); // Change icon
    } else {
        passwordInput.type = "password";
        svg.classList.replace("fa-eye-slash", "fa-eye"); // Change icon back
    }
};


document.querySelector('.modal-overlay').addEventListener('click', closePopup)
document.querySelector('.close-btn').addEventListener('click', closePopup)