const loginForm = document.getElementById("login-form");

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const validateWithRegex = (text, pattern) => {
  return pattern.test(text);
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateFormItems(e.target.children)) {
    const userData = {
      username: e.target.children[0].getElementsByTagName("input")[0].value,
      password: e.target.children[2].getElementsByTagName("input")[0].value,
    };
    const submitBtn = e.target.querySelector(".submit-btn");
    console.log(submitBtn);
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      Toastify({
        
        text: "Login is successful!",
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
  let paswordElement = formItems[2].getElementsByTagName("input")[0];
  let paswordErrorElement = formItems[3];
  nameErrorElement.textContent = "";
  paswordErrorElement.textContent = "";
  if (!nameInputElement.value) {
    nameErrorElement.textContent = " name is required";
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

  return !hasError;
}

function resetForms() {
  loginForm.children[0].getElementsByTagName("input")[0].value = "";
  loginForm.children[2].getElementsByTagName("input")[0].value = "";
}
