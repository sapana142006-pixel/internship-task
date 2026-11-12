function toggleProfile(button) {
  
  const extraInfo = button.nextElementSibling;

  
  if (extraInfo.style.display === "block") {
    extraInfo.style.display = "none";
    button.textContent = "View Profile";
    button.style.backgroundColor = "#3498db";
  } else {
    extraInfo.style.display = "block";
    button.textContent = "Hide Profile";
    button.style.backgroundColor = "#2c3e50";
  }
}