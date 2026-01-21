# Portfolio

A personal portfolio built with Vue 3, TypeScript, and Vite.

## Prerequisites

- Node.js 22+
- npm 10+
- Docker (optional, for containerized deployment)

## Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` with hot module replacement.

### Type checking

```bash
npx vue-tsc --noEmit
```

### Build for production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview production build

```bash
npm run preview
```

## Docker

### Build the image

```bash
docker build -t portfolio .
```

### Run the container

```bash
docker run -p 8080:80 portfolio
```

The app will be available at `http://localhost:8080`.

### Run in detached mode

```bash
docker run -d -p 8080:80 --name portfolio portfolio
```

### Stop the container

```bash
docker stop portfolio
```

### Remove the container

```bash
docker rm portfolio
```

### Build and run with Docker Compose (optional)

Create a `docker-compose.yml`:

```yaml
services:
  portfolio:
    build: .
    ports:
      - "8080:80"
```

Then run:

```bash
docker compose up --build
```

## Project Structure

```
├── public/          # Static assets
├── src/             # Source code
├── index.html       # Entry HTML
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
└── Dockerfile       # Container build instructions
```
