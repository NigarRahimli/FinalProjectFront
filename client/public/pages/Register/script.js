const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateFormItems(e.target.children);
});
function validateFormItems(formItems) {
  let hasError = false;
  let nameInputElement = formItems[0].getElementsByTagName("input")[0];
  console.log(nameInputElement);
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
  if (!paswordElement.value) {
    paswordErrorElement.textContent = " password must be number!";
    hasError = true;
  }
  if (!cpaswordElement.value) {
    cpaswordErrorElement.textContent = " confirm pasword is required";
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
