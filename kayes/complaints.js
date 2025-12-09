let nameError = document.getElementById("nameError");
let  nameInput = document.getElementById("nameInput");

const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");

const serviceSelect = document.getElementById("service");
const serviceError = document.getElementById("serviceError");

const descInput = document.getElementById("description");
const descError = document.getElementById("descError");

//  name validation
function validateName(){
    if(nameInput.value.trim() === ""){
        nameError.textContent = "Name is required";
        nameError.style.color = "#1565C0"
        return false;
    }
    else {
        nameError.textContent="";
        return true;
    }
}

// email validate
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required";
    emailError.style.color = "#1565C0"
    return false;
  } else if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Enter a valid email address";
    emailError.style.color = "#1565C0"
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}
// service option 
function validateService() {
  if (serviceSelect.value === "") {
    serviceError.textContent = "Please select a service";
    serviceError.style.color = "#1565C0"
    return false;
  } else {
    serviceError.textContent = "";
    return true;
  }
}

// dexcription 
function validateDescription() {
  const length = descInput.value.trim().length;

  if (length < 10) {
    descError.textContent = "Description must be at least 10 characters";
    descError.style.color = "#1565C0"
    return false;
  } else {
    descError.textContent = "";
    return true;
  }
}


// submit button
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isServiceValid = validateService();
  const isDescValid = validateDescription();

   if (isNameValid && isEmailValid && isServiceValid && isDescValid) {
      document.querySelector("form").submit();
  }

});
