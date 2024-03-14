# Bento Skeleton Server

## Features
The Bento Skeleton Server connects all the services of the Bento project with each other. It is like a data highway as all the cross-server communication is happening through this server. The full authentication of the B2B services of Bento platform is happening through this server. The main features are 

- API's for restaurant create, edit, read.
- API's for cross-server communication between Inventory, Menu-Builder, HR, KDS, POS, Marketplace, Review.
- Github-like JWT authentication for all the restaurant side services.
- Redis implementation for data caching.


## Folder Structure

```
├──server
│     ├── node_modules
│     ├── src
│     │   ├── controllers
│     │   ├── dummy-data
│     │   ├── interfaces
│     │   ├── middlewares
│     │   ├── models
│     │   ├── routers
│     │   ├── utilities
│     │   ├── config.ts
│     │   └── index.ts
│     ├── .env
│     ├── .env.example
│     ├──  package-lock.json
│     ├──  package.json
│     ├──  tsconfig.json
│     ├── .gitignore
│     └──  README.md
```

## Deployed Base URl
``` ```

## Getting Started

### Prerequisites

- Node.js (version X.X.X or later)
- npm
- concurrently

### Installation
1. Clone the repository or download the source code: ```  git clone https://github.com/Project-Code-Projects/bento-skeleton-server.git ```

2. Navigate into the project directory:  ``` cd bento-skeleton-server ```

3. Navigate into the server directory: ``` cd server ```

4. Install dependencies using npm: ``` npm install ```

5. Start the server: ``` npm run dev ```




