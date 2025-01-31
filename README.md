<<<<<<< HEAD
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17786684&assignment_repo_type=AssignmentRepo)
# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini
=======
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17920382&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2
<<<<<<< HEAD

# API Documentation

## Base URL
```
https://biliqlo.my.id
```
## Public IPv4 address (in case server is down)
```
13.211.190.146
```

## Authentication
Some endpoints require authentication. Include the access token in the request header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Add User (Staff Registration)
Create a new staff user account (Admin only)

- **URL**: `/add-user`
- **Method**: `POST`
- **Auth Required**: Yes (Admin only)
- **Headers Required**:
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string",
    "username": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content Example**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": 1,
        "username": "staffuser",
        "email": "staff@example.com",
        "password": "hashed_password",
        "role": "staff",
        "phoneNumber": "1234567890",
        "address": "123 Staff Street",
        "updatedAt": "2023-08-01T10:00:00.000Z",
        "createdAt": "2023-08-01T10:00:00.000Z",
      }
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    {
      "message": "Validation error",
      "errors": [
        "Email is required",
        "Password is required",
      ]
    }
    ```
  - **Code**: 401 Unauthorized
    ```json
    {
      "message": "Error: Authentication failed. Access denied."
    }
    ```
  - **Code**: 403 Forbidden
    ```json
    {
      "message": "Error: Forbidden. You are not authorized to access this resource."
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```
- **Notes**:
  - Password will be automatically hashed before storage
  - Role will be automatically set to "staff"
  - Only authenticated admins can access this endpoint

### Login
Authenticate a user and receive an access token

- **URL**: `/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string",         
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request (Missing Required Fields)
    ```json
    {
      "message": "Validation error",
      "errors": [
        "Email/Username is required",
        "Password is required"
      ]
    }
    ```
  - **Code**: 401 Unauthorized (Invalid Credentials)
    ```json
    {
      "message": "Error: Authentication failed. Access denied."
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```
    

### Login via Google
Authenticate a user and receive an access token
- **URL**: `/google-login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string",         
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **Error Responses**:
    - **Code**: 500 Google login verification failed
    ```json
    {
      "message": "Google login verification failed"
    }
    ```
- **Notes**:
  - Users can login using either email or username
  - Valid for both admin and staff users
  - Access token should be stored securely by the client
  - Access token must be included in subsequent authorized requests endpoints


### Public Endpoints

#### Get All Main Entities (Public)
- **URL**: `/pub/products`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        id
        title        
        price
        description        
        images        
        createdAt
        updatedAt
        category: {
            .
            .
            .
        }
      }
      {
        .
        .
        .
      }
      {
        .
        .
        .
      }
    ]
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Main Entity by ID (Public)
- **URL**: `/pub/products/:id`
- **Method**: `GET`
- **Auth Required**: No
- **URL Params**: `id=[integer]`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
       id
        title        
        price
        description        
        images        
        createdAt
        updatedAt
        category: {
            .
            .
            .
        }
    }
    ```
- **Error Response**:
  - **Code**: 404 Not Found
    ```json
    {
      "message": "Data not found"
    }
    ```

### Post to Gemini AI
- **URL**: `/askme`
- **Method**: `POST`
- **Auth Required**: No
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
  ```json
    {
      "reply": <reply message>
    }
    ```

### Get API Checkout 
- **URL**: `/api/checkout``
- **Method**: `POST`
- **Auth Required**: No
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
  ```json
    {
      message: "Checkout Success", 
      <transactionToken>, 
      <orderId>
    }
    ```
=======
>>>>>>> 11923a0593da8ed04fef3f164bc7ae4612d0d408
>>>>>>> 5b96be01ab459f0fb926b3b67cad3ff6cdf60cb6
