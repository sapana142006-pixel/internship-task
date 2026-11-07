
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    
    event.preventDefault();

   
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;

    
    if (name === "" || email === "" || age === "" || course === "" || password === "") {
        message.style.color = "#dc2626"; 
        message.textContent = "Error: Please fill in all fields.";
    } else if (!email.includes("@") || !email.includes(".")) {
        message.style.color = "#dc2626";
        message.textContent = "Error: Please enter a valid email address.";
    } else if (age <= 0 || age > 100) {
        message.style.color = "#dc2626";
        message.textContent = "Error: Please enter a valid age.";
    } else if (password.length < 6) {
        message.style.color = "#dc2626";
        message.textContent = "Error: Password must be at least 6 characters long.";
    } else {
        
        message.style.color = "#16a34a"; 
        message.textContent = "Registration Successful!";

        form.reset();
    }
});