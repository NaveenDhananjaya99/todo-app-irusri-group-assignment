### Project README ####

### Project Overview
This project is a sample application designed to demonstrate key aspects of modern software development. The application incorporates atomic architecture for its folder structure and provides mock users for login functionality. This README will guide you through the project setup, structure, and usage.

### Table of Contents
 # Introduction
 # Folder Structure
 # Mock Users
 # Getting Started
 # Usage



### Introduction
This project showcases the use of atomic architecture, which is a design pattern aimed at creating scalable and maintainable applications. By breaking down the application into small, reusable components, atomic architecture facilitates better organization and modularity.

### Folder Structure
The project follows the atomic architecture pattern with the following folder structure:


src/
├── components/
│   ├── atoms/
├── pages/
    ├── Feature/
        ├── atoms
├── store/
    ├── atoms
├── assets/
├── redux/
│   ├── atoms/
├── hooks/
│   ├── atoms/
└── _mocks_/


### Mock Users
To facilitate login functionality, the project includes a set of mock users. These users can be used to test the login system:

 {
    name: "user1",
    email: "user1@test.com",
    password: "password123",
  },
  {
    name: "user2",
    email: "user2@test.com",
    password: "abc12345",
  },
  {
    name: "admin",
    email: "admin@test.com",
    password: "adminpass",
  },

### Usage
To use the mock users for login, simply input one of the provided credentials in the login form. The application will authenticate the user against the mock user list.