const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("dumpName").value.trim();
    const location = document.getElementById("inputLoca").value.trim();
    const file = document.getElementById("file").files.length;
    const desc = document.getElementById("dumpDesc").value.trim();

    const nameError = document.getElementById("inputNaError");
    const locationError = document.getElementById("inputLocation");
    const fileError = document.getElementById("inputFile");
    const descError = document.getElementById("dumpDesc");

    nameError.textContent = "";
    locationError.textContent = "";
    fileError.textContent = "";
    descError.textContent = "";

    let isValid = true;

    if (name === "") {
        nameError.textContent = "Name is required!";
        nameError.style.color = "#1565c0";
        isValid = false;
    }

    if (location === "") {
        locationError.textContent = "Location is required!";
        locationError.style.color = "#1565c0";
        isValid = false;
    }

    if (file === 0) {
        fileError.textContent = "Please upload a file!";
        fileError.style.color = "#1565c0";
        isValid = false;
    }

    if (desc.length < 10) {
        descError.textContent = "Description must be at least 10 characters!";
        descError.style.color = "#1565c0";
        isValid = false;
    }

    if (isValid) {
        form.submit();
    }
});
