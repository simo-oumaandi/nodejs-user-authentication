const form = document.querySelector("form");
    // const emailError = document.querySelector(".ui.email");
    // const passwordError = document.querySelector(".ui.password");

    console.log(passwordError.attributes);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();


        // RESET ERRORS
        emailError.textContent = '';
        passwordError.textContent = '';

        // GET VALUES
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        try {
            const res = await fetch('/signup', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            console.log(data);
            // SHOWING ERROR MESSAGES
            if (data.errors) {
                let emailErrDiv = document.createElement('div');
                emailErrDiv.setAttribute('class', 'ui message red');
                emailErrDiv.textContent = data.errors.email;
                form.appendChild(emailErrDiv);


                let passwordErrDiv = document.createElement('div');
                passwordErrDiv.setAttribute('class', 'ui message red');
                passwordErrDiv.textContent = data.errors.password;

                // errDiv.appendChild(document.createTextNode("Errors: " + {data.errors.email} + " <br> Errors: ${data.errors.password}"));
                form.appendChild(passwordErrDiv);


                // emailError.textContent = data.errors.email;
                // passwordError.textContent = data.errors.password;

            }
            if (data.user) {
                location.assign('/');
            }
        } catch (err) {
            console.log(err);
        }
    });




    //   const res = await fetch('/signup', { 
    //     method: 'POST', 
    //     body: JSON.stringify({ email, password }),
    //     headers: {'Content-Type': 'application/json'}
    //   });