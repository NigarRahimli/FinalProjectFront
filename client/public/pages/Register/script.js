const registerForm = document.getElementById("register-form");
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const validateWithRegex = (text, pattern) => {
  return pattern.test(text);
};
const name=registerForm.getElementsByTagName("input")[0];

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateFormItems(e.target.children)) {
    const userData = {
      username: e.target.children[0].getElementsByTagName("input")[0].value,
      email: e.target.children[2].getElementsByTagName("input")[0].value,
      password: e.target.children[4].getElementsByTagName("input")[0].value,
    };
    const submitBtn = e.target.querySelector(".submit-btn");
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      Toastify({
        text: "Registration is successful!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          fontFamily: "Work Sans",
          background: "rgb(119, 187, 34)",
        },
      }).showToast();
      resetForms();
    } else {
      const errorData = await response.json();
      Toastify({
        text: errorData?.error,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          fontFamily: "Work Sans",
          background: "rgb(192, 36, 88)",
        },
      }).showToast();
    }
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
});
function validateFormItems(formItems) {
  let hasError = false;
  let nameInputElement = formItems[0].getElementsByTagName("input")[0];
  let nameErrorElement = formItems[1];
  let emailElement = formItems[2].getElementsByTagName("input")[0];
  let emailErrorElement = formItems[3];
  let paswordElement = formItems[4].getElementsByTagName("input")[0];
  let paswordErrorElement = formItems[5];
  let cpaswordElement = formItems[6].getElementsByTagName("input")[0];
  let cpaswordErrorElement = formItems[7];
  nameErrorElement.textContent = "";
  emailErrorElement.textContent = "";
  paswordErrorElement.textContent = "";
  cpaswordErrorElement.textContent = "";
  if (!nameInputElement.value) {
    nameErrorElement.textContent = " name is required";
    hasError = true;
  }
  if (!emailElement.value) {
    emailErrorElement.textContent = " email is required";
    hasError = true;
  }
  if (!EMAIL_REGEX.test(emailElement.value)) {
    paswordErrorElement.textContent = " Invalid email format";
    hasError = true;
  }
  if (!paswordElement.value) {
    paswordErrorElement.textContent = " password is required!";
    hasError = true;
  }
  if (!PASSWORD_REGEX.test(paswordElement.value)) {
    paswordErrorElement.textContent =
      " Password must have 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be 8-10 characters long!";
    hasError = true;
  }

  if (!cpaswordElement.value) {
    cpaswordErrorElement.textContent = " confirm password is required";
    hasError = true;
  }
  if (cpaswordElement.value !== paswordElement.value) {
    cpaswordErrorElement.textContent =
      " confirm password does not match with password";
    hasError = true;
  }

  return !hasError;
}

function resetForms() {
  registerForm.children[0].getElementsByTagName("input")[0].value = "";
  registerForm.children[2].getElementsByTagName("input")[0].value = "";
  registerForm.children[4].getElementsByTagName("input")[0].value = "";
  registerForm.children[6].getElementsByTagName("input")[0].value = "";
}
