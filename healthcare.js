// Submit any form using AJAX
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let formData = new FormData(this);

        let request = await fetch("healthcare.php", {
            method: "POST",
            body: formData
        });

        let result = await request.json();

        alert(result.message);

        if (result.status === "success") {
            this.reset();
        }
    });
});
