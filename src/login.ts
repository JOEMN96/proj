const loginForm = <HTMLFormElement>document.querySelector(".login form");

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(loginForm);

  if (formData.get("password") === "pass@123xq" && formData.get("userName") === "admin") {
    if (formData.get("mode") === "User") {
      window.location.replace(window.location.origin + "/src/pages/user.html");
    } else if (formData.get("mode") === "Assigner") {
      window.location.replace(window.location.origin + "/src/pages/Assigner.html");
    } else {
      window.location.replace(window.location.origin + "/src/pages/Assignee.html");
    }
  }
});
