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
	execSync('npm install react-router-dom', { stdio: 'inherit' });
	console.log('Added React Router...');
	createCustomStructure();
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
	const actixDependency = '\n\n[dependencies]\nactix-web = "4.0.0-beta.8"\n';
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

function createCustomStructure() {
	// Example: Creating a components directory with a sample component
	const componentsDir = path.join(process.cwd(), 'src/components');
	if (!fs.existsSync(componentsDir)) {
		fs.mkdirSync(componentsDir, { recursive: true });
	}

	const sampleComponentContent = `
import React from 'react';

const SampleComponent = () => (
    <div>Sample Component</div>
);

export default SampleComponent;
    `;
	fs.writeFileSync(
		path.join(componentsDir, 'SampleComponent.jsx'),
		sampleComponentContent
	);

	console.log('Custom structure created.');
}

function main() {
	console.log('Creating Rust-React project...');

	try {
		fs.mkdirSync('my-rust-react-app');
		process.chdir('my-rust-react-app');

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
