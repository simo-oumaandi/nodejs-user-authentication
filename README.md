# Passport-jwt

### The basic flow looks like this:

 - [**5 steps**](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)


 1. User logs in with username and password
 2. Express server validates the username and password, signs a JWT, and sends that JWT back to the user.
 3. The user will store the JWT in the browser (this is where our Angular app comes in) via localStorage.
 4. For every request, Angular will add the JWT stored in localStorage to the Authorization HTTP Header (similar to how we stored our session in the Cookie header)
 5. For every request, the Express app will run the passport.authenticate() middleware, which will extract the JWT from the Authorization header, verify it with a Public Key, and based on the result, either allow or disallow a user from visiting a route or making an API call.

 - [Jwt and passport combine](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport)
 




passport jwt strategy
