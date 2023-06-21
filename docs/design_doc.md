Design Document: Contact List App

1. Introduction:
The Contact List App is a web-based application that allows users to manage their contacts, connect with friends, and maintain a personalized contact list. This document outlines the high-level design and architecture of the app, including its modules, components, and interactions.

2. System Overview:
The Contact List App consists of several key modules and components that work together to provide the desired functionality. The main modules include:

- User Management: Handles user authentication, registration, and profile management.
- Contact Management: Allows users to create, update, and delete contacts in their contact list.
- Friend Management: Enables users to invite friends, manage friend requests, and share contacts with friends.
- Admin Panel: Provides administrative capabilities, including managing user accounts and access levels.
- Database: Stores user data, contact information, friend relationships, and other relevant entities.
- User Interface: The frontend components that allow users to interact with the app's features and functionalities.

3. Architecture Overview:
The Contact List App follows a client-server architecture, with a web-based frontend interacting with a backend server and a database. The frontend is responsible for rendering the user interface and handling user interactions, while the backend handles data processing, business logic, and database interactions. Here is an overview of the architectural components:

- Frontend:
  - User Interface: Built using HTML, CSS, and JavaScript.
  - Framework/Libraries: Utilizes React frontend framework  for efficient UI development.
  - API Integration: Communicates with the backend server via RESTful APIs to fetch and update data.

- Backend:
  - Server: Implements the application server using a server-side technology ( Node.js / Express, MongoDB ).
  - RESTful API: Exposes endpoints to handle user authentication, contact management, friend management, and other app functionalities.
  - Business Logic: Implements the core logic of the application, including user access control, contact sharing, and friend requests handling.
  - Integration with External Services: Integrates with email services for user notifications and image storage services for profile pictures.
  - Security: Implements authentication and authorization mechanisms to protect user data and prevent unauthorized access.

-Database:
- Non-Relational Database Management System (NoSQL): The Contact List App utilizes MongoDB, a document-based NoSQL database, to store user data, contact information, friend relationships, and other relevant entities.
- Collections and Documents: Instead of tables, the database organizes data into collections, which hold individual documents in a flexible JSON-like format.
- Document Structure: Each document represents a user, contact, or friend entity and contains key-value pairs that define its attributes.
- Schema Flexibility: MongoDB's flexible schema allows for easy adaptation to evolving data requirements without the need for strict predefined structures.
- Relationships: Relationships between entities are typically represented using references or embedded documents within the corresponding entities.
- Data Consistency and Integrity: MongoDB supports various mechanisms such as atomic updates and transactions to ensure data consistency and integrity.
- Scalability: MongoDB's distributed architecture enables horizontal scalability, allowing the database to handle increased data volume and user load.
 
1. User Workflow:
The typical workflow of a user in the Contact List App involves the following steps:

- Registration and Login:
  1. Users sign up by providing their personal information and creating an account.
  2. After successful registration, users can log in to the app using their credentials.

- Contact Management:
  1. Users can create new contacts by entering contact details such as name, phone number, and email address.
  2. They can update existing contact information or delete contacts that are no longer needed.
  3. Users can view their contact list, search for specific contacts, and sort/filter contacts based on various criteria.

- Friend Management and Contact Sharing:
  1. Users can invite other users to become friends within the app.
  2. When a friend invitation is received, the recipient can accept or reject the request.
  3. Friends can view each other's profile information.
  4. Users can share specific contacts with their friends, allowing them to access and potentially add those contacts to their own lists.

- Admin Functionality:
  1. The root admin user has additional privileges to manage user accounts, access levels, and perform administrative tasks.
  2. The admin can update user profiles, delete user accounts, and promote/demote users to different access levels.

5. Data Flow and API Endpoints:
The Contact List App utilizes RESTful API endpoints for data exchange between the frontend and backend. Some example API endpoints include:

- User Management:
  - [X] POST /api/user/signup: Registers a new user.
  - [x] POST /api/user/login: Authenticates user login.
  - [x] POST /api/profile/user/:user_id : Creates user profile information.
  - [x] GET /api/profile: Retrieves user profile information.
  - [x] PUT /api/profile: Updates user profile information.

- Contact Management:
  - [ ] GET /api/contacts: Retrieves a user's contact list.
  - [x] POST /api/contact/create: Creates a new contact.
  - [ ] PUT /api/contacts/:id: Updates an existing contact.
  - [ ] DELETE /api/contacts/:id: Deletes a contact.

- Friend Management:
  - [ ] POST    /api/friends/invite: Sends a friend invitation to another user.
  - [ ] POST    /api/friends/accept: Accepts a friend request.
  - [ ] POST    /api/friends/reject: Rejects a friend request.
  - [ ] GET     /api/friends/list: Retrieves a user's friend list.

- Admin Panel:
  - [x] PATCH   /api/admin/user-profile/:id: Updates a user's profile information.
  - [x] DELETE  /api/admin/delete-user?:user_id : Deletes a user account.
  - [x] PATCH   /api/admin/user-role?:user_id&:role  : Updates / changes user's access level.
  - [x] GET /api/admin/get-all-users : Get all signed up users

1. Security Considerations:
- Authentication: User authentication should be implemented securely, using strong password hashing and session management techniques.
- Authorization: Access control should be enforced to ensure users can only perform actions they are authorized to do based on their access level.
- Input Validation: All user inputs should be properly validated and sanitized on the server-side to prevent security vulnerabilities such as SQL injection and cross-site scripting (XSS).
- Data Privacy: Personal user data and contact information should be stored securely and protected from unauthorized access.
- HTTPS: The communication between the frontend and backend should be encrypted using HTTPS to ensure data integrity and confidentiality.

1. Testing and Quality Assurance:
- Unit Testing: Implement unit tests to verify the functionality of individual components and modules.
- Integration Testing: Conduct integration tests to verify the interactions between different modules and components.
- User Acceptance Testing: Involve users in testing the application to ensure it meets their requirements and expectations.

- Performance Testing: Test the application under various loads and scenarios to ensure it performs optimally.

1. Deployment and Scalability:
- Deployment: The app should be deployed to a production environment using a scalable hosting platform, ensuring high availability and reliability.
- Scalability: Design the architecture to handle increased user loads by utilizing scalable infrastructure, load balancing, and caching mechanisms.

** Note: This design document provides an overview of the Contact List App's architecture, modules, and key considerations. Further detailed design and implementation decisions can be made during the development phase based on the chosen technologies, frameworks, and specific requirements.