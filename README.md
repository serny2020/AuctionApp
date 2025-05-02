# Car Auction Platform
This project is a full-stack car auction website built with a modern microservices architecture. It allows users to browse, bid, and manage car auctions in real-time. The system is designed for scalability, modularity, and responsiveness using a suite of backend services, real-time features, and a powerful frontend UI.

## Project Highlights
### Architecture Overview
The application follows a microservices architecture where each domain-specific responsibility is handled by a dedicated service. This design ensures better scalability, maintainability, and clear separation of concerns.

### Key Components
- Backend Microservices (C# / .NET):

    * Built several independent services to manage auctions, bidding, user profiles, payments, and notifications.

    * Services communicate using RabbitMQ for asynchronous messaging and gRPC for high-performance synchronous communication.

* Authentication and Authorization:

    * Centralized identity management using IdentityServer as the identity provider.

    * Each service securely validates access tokens for fine-grained access control.

* API Gateway:

    * Implemented a gateway using Microsoft YARP (Yet Another Reverse Proxy) to route requests to appropriate services.

    * Centralized cross-cutting concerns like logging, rate-limiting, and authentication.

* Frontend (Next.js 13.4+):

    * Built the client-side web application using Next.js with the new App Router for better routing, server components, and performance.

    * Real-time bidding updates and notifications are pushed using SignalR.

* Real-Time Communication:

    * SignalR enables instant updates for auction events such as new bids and status changes.

### DevOps and Deployment
* Docker & Docker Compose:

    * All services are containerized with Docker.

    * Docker Compose used to orchestrate local development and testing.


## Getting Started
### Prerequisites
* Docker & Docker Compose

* Node.js (for Next.js frontend)

* .NET SDK

### Run Locally

1. Clone the repository
```bash
git clone https://github.com/your-username/car-auction-platform.git
```
2. Navigate to the project folder
```bash
cd car-auction-platform
```
3. Build and start services using docker compose
```bash
docker-compose up --build
```
4. The platform will be available at http://localhost:8080.

## Technologies Used
- Frontend: Next.js (App Router), React (Client side)

- Backend: .NET Core MVC, gRPC, RabbitMQ

- Auth: IdentityServer

- Gateway: Microsoft YARP

- Real-Time: ASP.NET SignalR

- Containerization: Docker, Docker Compose
