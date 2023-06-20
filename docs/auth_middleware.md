Technical Specifications for  `auth` middleware :

1. **Dependencies**:
   - The `auth` middleware requires the `jsonwebtoken` module to be installed.

2. **Exported Function**:
   - The module exports a middleware function named `auth`.
   - This function takes `req`, `res`, and `next` as parameters.
   - It is intended to be used as middleware in an Express route to authenticate and authorize requests.

3. **Token Extraction**:
   - The middleware extracts the token from the request headers.
   - It expects the token to be provided in the `"Authorization"` header using the Bearer scheme.
   - If the `Authorization` header is missing, it sends a JSON response with a status code of 401 (Unauthorized) and a message indicating access denial.

4. **Token Verification**:
   - The extracted token is split to remove the Bearer prefix and obtain the actual token value.
   - The token is then verified using `jwt.verify()` function from the `jsonwebtoken` module.
   - The verification requires the token, a secret key (`process.env.TOKEN_SECRET`), and additional options (an empty object `{}`).
   - If the token verification succeeds, the decoded user object is assigned to `req.user`.
   - If an error occurs during token verification, the callback function handles the error. If the error is an instance of `JsonWebTokenError`, it is returned as the response. Otherwise, `null` is returned.
   - The callback function passed to `jwt.verify()` is used for custom error handling and to return the decoded user object or the error.

5. **Error Handling**:
   - If there is an unexpected error during token verification or if the callback returns an error, a JSON response with a status code of 422 is sent, and the error message indicates a login failure.
   - If the token verification is successful and no errors occur, the middleware calls the `next()` function to proceed to the next middleware or route handler.

 