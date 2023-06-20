# Technical Specifications for `signup.validation.js` middleware

1. **Dependencies**:
   - The code requires the following dependencies to be installed:
     - `User` model from the `"../model/user.model"` module.
     - `Joi` module for data validation.

2. **Payload Schema**:
   - The `payloadSchema` variable defines a validation schema using the `Joi.object()` function.
   - The schema includes the following fields with their corresponding validation rules:
     - `password`: A required string field.
     - `confirm_password`: A field that should be equal to the `password` field, also required.
     - `contactNumber`: A required string field.
     - `email`: A required string field that should be a valid email address.
     - `fullName`: A required string field.
     - `completeAddress`: An optional string field.

3. **Exported Function**:
   - The module exports a function named `validateSignup`.
   - This function is an asynchronous middleware function that takes `req`, `res`, and `next` as parameters.
   - It is intended to be used as middleware in an Express route.
   - The purpose of this function is to validate the request body against the defined `payloadSchema` using `payloadSchema.validate()`.
   - If there is a validation error, it sends a JSON response with a status code of 422 and the corresponding error message.
   - If the email provided in the request body already exists in the `User` model, it sends a JSON response with a status code of 422 and a message indicating a duplicate email.
   - If the validation and duplicate email checks pass, it calls the `next()` function to proceed to the next middleware or route handler.

4. **Error Handling**:
   - If there is a validation error, the specific error message from the `Joi` validation result is extracted using `error.details[0].message`.
   - If there is a duplicate email, a specific message is sent as a JSON response.
   - Both validation errors and duplicate email errors return a status code of 422, indicating an unprocessable entity.

N 