# G1 Capstone

## Getting Started

- Create a local database `capstone` and add your details to a local `.env`

```js
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_URL=
```

- Install Dependencies
  `npm install`

- Run Development
  `npm run dev`

### Tech Stack

- React 18 with Redux Toolkit
- Express
- Auth0
- Vite
- Tailwind CSS

### Folder Structure

    .
    ├── /dist                     # Prod React Bundle
    ├── /public                   # Shared static files (favicon)
    ├── /src
       ├── /server                # Express Backend
         ├── /db                    # Sequelize Models and Relationships
         └── /api                   # API Routes
       ├── /client                # React Frontend
         ├── /assets                    # Static Assets
         ├── /components                # React UI Components
         ├── /pages                     # Page Components (Routes)
         ├── /store                     # Redux Store and Thunks
         ├── router.jsx             # React Router
         └── main.jsx               # App Providers
