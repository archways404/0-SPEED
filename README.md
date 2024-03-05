# 0-SPEED

This project sets up a full-stack web application using React with Vite for the frontend and Rust with Actix-web for the backend.

## Prerequisites

- Node.js and npm must be installed to set up the frontend.
- Rust and Cargo must be installed to set up the backend.
- `concurrently` npm package is used to run both frontend and backend servers simultaneously.

## Getting Started

To create a new Rust-React project, simply clone this repository and run the script in your terminal with:

```bash
./setupScript.sh
```

Replace `setupScript.sh` with the actual name of the script file.

## Script Functions

- `setupFrontend()`: Sets up a new React project using Vite, installs dependencies, and prepares the development environment.
- `setupBackend()`: Initializes a new Rust project with Actix-web, sets up the basic structure for a web server, and adds necessary dependencies.
- `addDevScript()`: Adds a npm script to run both frontend and backend servers with `concurrently`.

## Usage

After running the script, your project directory will contain two subdirectories:

- `frontend`: Contains the React-Vite application.
- `test-backend`: Contains the Rust-Actix application.

You can start the full-stack application by navigating to the project root and running:

```bash
npm run dev
```

This will start the backend Rust server and the frontend React development server concurrently.

## Structure

The project has the following structure:

- `my-rust-react-app/`: The root directory of the full-stack application.
  - `frontend/`: The React-Vite frontend application.
  - `test-backend/`: The Rust-Actix backend server.

## Contributions

Contributions are welcome. Please fork the repository and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

