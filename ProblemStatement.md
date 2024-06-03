# Capstone Project-StoreFleet


1. Objective

                    You have recently joined the startup 'StoreFleet', an instant product delivery service similar to Blinkit, Zepto, and Swiggy. StoreFleet aims to be a formidable competitor by offering instant delivery not only for food and groceries but also for various products such as smartphones and other categories. As a new team member, your role is to implement new features, resolve existing bugs, and enhance the project's functionality.

2. Scaffold:
                    You can clone the given github repository to get the scaffold code

# Github Link - https://github.com/content-cn/Node-CapstoneProject-StoreFleet

3. Objective:
                    Code Analysis and Debugging

                    Thoroughly analyze the project's source code, understand the flow of each route, and identify and debug existing issues and errors.

1. Description:
                    This objective involves a comprehensive analysis of the project's source code. Gain an in-depth understanding of the codebase, including the flow for each route. The goal is to identify and resolve any existing issues and errors, ensuring the project's stability and reliability.
                    
                    Implement Welcome E-mail Feature with Nodemailer
                    
                    Automatically send a welcome e-mail with HTML content, including the company's brand logo, to users upon successful registration.

2. Description:
                    Implement an automatic welcome e-mail feature that uses Nodemailer to send HTML-based e-mails to users.

                    The e-mail should include the company's brand logo and serve as a warm welcome to new registrants. Consult the image below for context.

                    Logo Link - https://files.codingninjas.in/logo1-32230.png?_ga=2.53373358.702681965.1711203204-1120808759.1709863166

                    Output - https://files.codingninjas.in/picture1-32306.png

                    The route responsible for registering a user is:

3. user signup route
                    Handle Duplicate Key Error in MongoDB
                    
                    Ensure that only one registration with a unique email address is allowed and provide clear error messages.

4. Description:
# To enhance user registration, ensure that each email address is unique. Handle duplicate key errors gracefully by providing clear and user-friendly error messages when a user attempts to register with an already registered email.

# Output based on default scaffold:

                    Output - https://files.codingninjas.in/picture2-32307.png

# Expected output after Error Handling:

                    Output - https://files.codingninjas.in/picture3-32308.png

# Use Mongoose Middleware for Password Hashing

# Automatically hash user passwords using bcrypt via Mongoose Middleware before saving user documents.


5. Description:
                    Implement a Mongoose pre-hook (Middleware) in the user schema. This pre-hook should automatically hash user passwords using bcrypt before saving user documents, enhancing user security. Implement Forget Password and Reset Feature
                    
                    Allow users to reset their passwords using a token-based approach with a time limit.

6. Description:
                    Implement a password forgot feature for users who have forgotten their passwords for which the 'resetUserPassword' method is given in the scaffold.
                    
                    Initially, verify the user's existence by their email address. We have provided static method 'getResetPasswordToken' in the user schema that uses 'crypto' (core module of Node.js, to generate a new token) to generate a new token and set a token expiry time.

7. NOTE:
                    Upon generating a token through the crypto library, hash it and save it in the 'resetPasswordToken' field within the user's document. Simultaneously, define a 10-minute expiration period for the generated token and store this information in the 'resetPasswordExpire' field.
                    
                    Utilize Nodemailer to send the token, to the user's email address. Users can reset their passwords within the specified time frame using the provided token. Consult the image below for context.

                    Output - https://files.codingninjas.in/picture4-32309.png

8. NOTE:
                    When a user submits a token for the purpose of resetting their password, the initial step is to hash this token. Subsequently, conduct a search within the user collection to identify which user's document contains a hashed token matching the provided token. If this operation occurs within the specified expiry time frame, proceed to update the password. However, if the token has expired, respond with a message indicating that the token has expired.
# The route responsible for password feature is: Forget password route

#The route responsible for password reset feature is:

# Reset Password route

                    Fix Bug in Securing Admin Routes
                    
                    Fix an issue in the 'authByUserRole("admin")' middleware to ensure that only users with 'admin' roles can access secured routes.

9. Description:
# Correct an existing issue in the 'authByUserRole("admin")' middleware.

# The issue allows users with roles other than 'admin' to access routes intended only for admin users.

# Ensure that only users with 'admin' roles can access these secured routes.

                    Implement Route and Controller for Updating User Roles by Admin

                    Create a route and associated controllers to allow users with 'admin' roles to update the roles of other users.


10. Description:
                    Implement a new route, '/api/storefleet/user/admin/update/:id', and its associated controllers and repository functions.

# id: This represents the object identifier of the user whose role is intended to be modified by the administrator.

# The admin passes the new details of the user as shown in the Postman (refer to the provided Postman link for additional information).

                    Execute product filtering, search capabilities and pagination.
                    
                    Implementation of search, filtration, and pagination functionalities in adherence to specified criteria, ensuring efficient data retrieval and enhanced user experience.

11. Description:
                    The "getAllProducts" controller should incorporate the implementation of the following three features:

# Utilise the MongoDB regex operator (please refer to the documentation for details) to search for a specified keyword within a user document's name field in the user collection. If a match is found, the document should be retrieved.

# For pagination, the MongoDB "limit" method is to be used, and it's recommended to refer to the MongoDB documentation for more details.

12. Note:
                    For filtration, use your logic.
                    
                    Refer to the Postman link for route URLs.
                    
                    Fix Review Delete Feature and Rating Update

                    Restrict users to deleting only their own reviews and update product ratings accordingly.

13. Description:
# Modify the review delete feature to allow users to delete only their reviews.

# When a user deletes a review, ensure the product's rating is accurately updated to reflect the change.

                    Implement Controller and Repository for Placing Orders

                    Create a controller and implement repository functions to handle the order placement process.

14. Description:
                    Analyze the 'order' schema and order placement logic within the application. Create the 'createNewOrder' controller and 'createNewOrderRepo' which allows users to place orders for products. 

15. Steps:
# Follow these steps to build the project:

# API Structure

Refer to the Postman Collection that contains folders with different routes for project implementation: 
                    Link - https://www.postman.com/prayrit/workspace/storefleet/collection/26789165-4d015bc6-c27e-4696-950c-6bd0e7cb0426?action=share&creator=26789165

Click on the provided collection URL.

Fork the collection to proceed with testing your application.

# Note: Adjust parameters (Objectid, postld, commentld, etc.) as needed.

# Evaluation Criteria:

# Evaluation parameters

﻿

# Code Analysis and Debugging
                    Create a comprehensive analysis of the code to effectively identify and resolve bugs.
Max score: 50

# Implement Welcome E-mail Feature with Nodemailer
                    Ensure successful implementation of the welcome e-mail feature with a focus on high-quality HTML e-mail design and proper utilization of Nodemailer for efficient e-mail communication. 
Max score: 50

# Handle Duplicate Key Error in MongoDB
                    Prevent duplicate email registrations while ensuring clear and user-friendly error messages for enhanced user experience.
Max score: 50

# Use Mongoose Middleware for Password Hashing
                    Securely store user passwords in documents by effectively executing the pre-hook, thereby enhancing user security.
Max score: 50

# Implement Forget Password and Reset Feature
                    Successful implementation of the password reset feature. Accurate token generation and e-mail communication using Nodemailer.
Max score: 50

# Fix Bug in Securing Admin Routes
                    Resolve the issue successfully by restricting access to admin users only.
Max score: 50

# Implement Route and Controller for Updating User Roles by Admin
Successful implementation of the route and controllers for updating user roles.
Max score: 50

# Execute product filtering, search capabilities and pagination
                    Successful implementation of search, filtration, and pagination functionalities in adherence to specified criteria, ensuring efficient data retrieval and enhanced user experience.
Max score: 50

# Fix Review Delete Feature and Rating Update
                    Successfully rectify the review delete feature, ensuring accurate product rating updates upon review deletion.
Max score: 50

# Implement Controller and Repository for Placing Orders
                    Successful implementation of the order placement feature.
Max score: 50