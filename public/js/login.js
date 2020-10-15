const form = document.querySelector("form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();



        // GET VALUES
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        try {
            // REQUESTING TO SERVER
            const res = await fetch('/login', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            });
            // GETTING RESPONSE FROM SERVER WITH SOME VALUE
            const data = await res.json();
            console.log(data);
            // SHOWING ERROR MESSAGES
            if (data.errors) {
                if (data.errors.email) {
                    let emailErrDiv = document.createElement('div');
                    emailErrDiv.setAttribute('class', 'ui message red');
                    emailErrDiv.textContent = data.errors.email;
                    form.appendChild(emailErrDiv);
                    setTimeout(() => {
                        form.removeChild(emailErrDiv);
                    }, 3000);
                }
                if (data.errors.password) {
                    let passwordErrDiv = document.createElement('div');
                    passwordErrDiv.setAttribute('class', 'ui message red');
                    passwordErrDiv.textContent = data.errors.password;

                    form.appendChild(passwordErrDiv);
                    setTimeout(() => {
                        form.removeChild(passwordErrDiv);
                    }, 3000);
                }





            }
            if (data.user) {
                location.assign('/');
            }
        } catch (err) {
            console.log(err);
        }
    });