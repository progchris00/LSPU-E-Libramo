const profileButton = document.getElementById("profile-button");
const profileMenu = document.getElementById("profile-menu");
profileButton.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});
