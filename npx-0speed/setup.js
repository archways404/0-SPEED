#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function setupFrontend() {
	console.log('Setting up React-Vite frontend...');
	execSync('npm create vite@latest frontend -- --template react', {
		stdio: 'inherit',
	});
	console.log('Installing frontend dependencies...');
	execSync('cd frontend && npm install', { stdio: 'inherit' });
	console.log('Added React Router...');
	//createCustomStructure();
	addDevScript();
	console.log('Frontend setup complete.');
}

function setupBackend() {
	console.log('Setting up Rust test-backend with Actix...');

	// Create a new Cargo project named "test-backend"
	execSync('cargo new test-backend', { stdio: 'inherit' });

	// Change directory to the new project
	process.chdir('test-backend');

	// Add Actix-web dependency to Cargo.toml
	const cargoTomlPath = './Cargo.toml';
	const actixDependency = 'actix-web = "4.0.0-beta.8"\n';
	fs.appendFileSync(cargoTomlPath, actixDependency);

	console.log('Actix-web dependency added to Cargo.toml');

	// Replace the contents of main.rs with a basic Actix-web app
	const mainRsPath = './src/main.rs';
	const actixApp = `
use actix_web::{web, App, HttpResponse, HttpServer, Responder};

async fn greet() -> impl Responder {
    HttpResponse::Ok().body("Hello, Actix-web!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(greet))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
`;
	fs.writeFileSync(mainRsPath, actixApp);
	console.log('Actix-web basic app setup complete.');

	process.chdir('..');
}

function addDevScript() {
	const packagePath = path.join(process.cwd(), 'package.json');
	const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

	packageJson.scripts = packageJson.scripts || {};
	packageJson.scripts.dev =
		'concurrently "cargo run --manifest-path=test-backend/Cargo.toml" "cd frontend && npm run dev"';

	fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
}

function main() {
	console.log('Creating Rust-React project...');

	try {
		fs.mkdirSync('my-rust-react-app');
		process.chdir('my-rust-react-app');

		// Initialize a new npm project at the root
		console.log('Initializing new npm project at the root...');
		execSync('npm init -y', { stdio: 'inherit' });

		// Install concurrently at the project root
		console.log('Installing concurrently at the project root...');
		execSync('npm install concurrently --save-dev', { stdio: 'inherit' });

		setupFrontend();
		setupBackend();

		console.log(
			'Project setup complete! Navigate into "my-rust-react-app" to get started.'
		);
	} catch (error) {
		console.error('Failed to create project:', error);
	}
}

main();
