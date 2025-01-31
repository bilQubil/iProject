[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17683403&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

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
- **Notes**:
  - Users can login using either email or username
  - Valid for both admin and staff users
  - Access token should be stored securely by the client
  - Access token must be included in subsequent authorized requests endpoints

### Main Entity (Products)

#### Create Main Entity
- **URL**: `/products`
- **Method**: `POST`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    name
    description
    price
    stock
    imageUrl
    categoryId
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      id
      name
      description
      price
      stock
      imageUrl
      categoryId
      authorId
      createdAt
      updatedAt
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    {
      "message": "Validation error message"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Main Entities
- **URL**: `/products`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        id
        name
        description
        price
        stock
        imageUrl
        categoryId
        authorId
        createdAt
        updatedAt
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

#### Get Main Entity by ID
- **URL**: `/products/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Params**: `id=[integer]`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      id
      name
      description
      price
      stock
      imageUrl
      categoryId
      authorId
      createdAt
      updatedAt
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    {
      "message": "Error: Data not found"
    }
    ```

#### Update Main Entity
- **URL**: `/products/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **URL Params**: `id=[integer]`
- **Request Body**:
  ```json
  {
    name
    description
    price
    stock
    imageUrl
    categoryId
    authorId
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      name
      description
      price
      stock
      imageUrl
      categoryId
      authorId
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    {
      "message": "Error: Data not found"
    }
    ```
  - **Code**: 400 Bad Request
    ```json
    {
      "message": "Validation error message"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete Main Entity
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **URL Params**: `id=[integer]`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Product successfully deleted"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    {
      "message": "Error: Data not found"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### Support Entity (Categories)

#### Create Support Entity
- **URL**: `/categories`
- **Method**: `POST`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    name
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      name
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    {
      "message": "Validation error message"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Support Entities
- **URL**: `/categories`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        id
        name
        createdAt
        updatedAt
      }
      {
        .
        .
        .
      }
      .
      .
      .
    ]
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update Support Entity
- **URL**: `/categories/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **URL Params**: `id=[integer]`
- **Request Body**:
  ```json
  {
    name
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      id
      name
      createdAt
      updatedAt
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    {
      "message": "Error: Data not found"
    }
    ```
  - **Code**: 400 Bad Request
    ```json
    {
      "message": "Validation error message"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

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
        name
        description
        price
        stock
        imageUrl
        categoryId
        authorId
        createdAt
        updatedAt
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
      name
      description
      price
      stock
      imageUrl
      categoryId
      authorId
      createdAt
      updatedAt
    }
    ```
- **Error Response**:
  - **Code**: 404 Not Found
    ```json
    {
      "message": "Data not found"
    }
    ```
