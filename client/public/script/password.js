const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");
const passContent = document.getElementsByClassName("pas-content")[0];
const requirements = [
  { regex: /^[A-Za-z\d@$!%*?&]{8,10}$/, index: 0 },
  { regex: /[0-9]/, index: 1 },
  { regex: /[a-z]/, index: 2 },
  { regex: /[@$!%*?&]/, index: 3 },
  { regex: /[A-Z]/, index: 4 },
];

passwordInput.addEventListener("keyup", function (e) {
  passContent.style.display = "block";
  requirements.forEach(function (item) {
    const isValid = item.regex.test(e.target.value);
    const requirementItem = requirementList[item.index];

    if (isValid) {
      requirementItem.classList.add("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-check";
    } else {
      requirementItem.classList.remove("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-circle";
    }
  });
});

passwordInput.addEventListener("focusout", (e) => {
  passContent.style.display = "none";
});

eyeIcon.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";

  eyeIcon.className = `fa-solid fa-eye${
    passwordInput.type === "password" ? "" : "-slash"
  }`;
});
