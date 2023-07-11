# FloorPlanner

Create your dream home floor plan in 3D. Build rooms, add furniture.

Try us out at: https://capstone-production-e9d2.up.railway.app/

## Getting Started

- Create a local database `capstone` and add your details to a local `.env`

```js
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_URL=
REACT_APP_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
REACT_APP_STRIPE_PUBLISHABLE_KEY=
```

- Install Dependencies
  `npm install`

- Run Development
  `npm run dev`

### Tech Stack

- React 18 with Redux Toolkit
- Express
- Clerk
- Vite
- Tailwind CSS
- Stripe

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
          └── /edditor3d                # ThreeJS
         ├── /hooks                     # Custom Hooks
         ├── /pages                     # Page Components (Routes)
         ├── /store                     # Redux Store and Thunks
         ├── router.jsx             # React Router
         └── main.jsx               # App Providers

### Created By

- Calvin Driesner | @cdriesner
- Julian Bombard | @jpbombard
- Scott Weaver | @unmonk
