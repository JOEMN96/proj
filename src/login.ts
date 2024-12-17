const loginForm = <HTMLFormElement>document.querySelector(".login form");

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(loginForm);

  if (formData.get("password") === "admin" && formData.get("userName") === "admin") {
    window.location.replace(window.location.origin + "/src/pages/choose-user-page.html");
  }
});
