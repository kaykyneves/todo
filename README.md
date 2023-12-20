<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


<body>

  <h1>TODO Aplication (API)</h1>

<li>In this project, I made a TODO API where the user can sign up and log in to post their TODO of the day.</li>

  <li> I made this project with:</li>

  ```bash
    
    🐱 NEST.JS
    🛕 PRISMA ORM
    🐘 POSTGRESQL
    🐳 DOCKER
    ⚫ JWT
    🟡 BCRYPT
    🔴 EXPRESS
  ```
<h2>Getting Started with NestJS</h2>

<p>Before you begin, make sure you have a NestJS project created, and the NestJS CLI is installed on your computer.</p>


## Prisma

### Install Prisma
```bash
npm install -D prisma
```
## Dependencies

- `@prisma/client`
- `@nestjs/passport`
- `@nestjs/jwt`
- `bcrypt`
- `class-validator`
- `class-transformer`
- `passport`
- `passport-jwt`
- `passport-local`
- `node-cron`

Use the following command to install all dependencies:

```bash
npm i node-cron @prisma/client @nestjs/passport @nestjs/jwt bcrypt class-validator class-transformer passport passport-jwt passport-local
```

## Dev Dependencies

- `@types/passport-jwt`
- `@types/passport-local`
- `@types/bcrypt`

```bash
npm i -D @types/passport-jwt @types/passport-local @types/bcrypt
```

## File `.env`

```bash

# Database

DATABASE_URL=""

# Configuration

JWT_SECRET=""


```

### Filled `.env` file

```bash

# Database

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Configuration

JWT_SECRET="texto aleatório para proteger sua aplicação"

```

 <H2> CHALLENGE</H2>
 <h2>Application</h2>
  <p>The TODO App allows a user to add reminders of things they need to do. Here are the requirements for the app:</p>

  <ul>
    <li>Users can add, delete, and see their todos.</li>
    <li>All the todos are private; users can't see other users' todos.</li>
    <li>Users must be logged in to add, delete, or see their todos.</li>
  </ul>

  <h2>Tasks</h2>

 <ol>
    <li>
      <strong>✔️ TASK 1:</strong> As a user, I can't add a todo without a description.
    </li>
    <li>
      <strong>✔️ TASK 2:</strong> As a user, I can mark a todo as completed. Write a database migration script in resources/.
    </li>
    <li>
      <strong>✔️ TASK 3:</strong> As a user, I can view a todo in JSON format. Ex: /todo/{id}/json =&gt; {id: 1, user_id: 1,
      description: "Lorem Ipsum"}
    </li>
    <li>
      <strong>✔️ TASK 5:</strong> As a user, I can see my list of todos.
    </li>
    <li>
      <strong>✔️ TASK 6:</strong> Implement an ORM database access layer so we don’t have SQL in the controller code.
    </li>
  </ol>
</body>
  <h2>ROUTES</h2>
  <li>I'm assuming that the user will test the aplicattion using the current port 3000</li>
  <h3>Sign up User</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="http://localhost:3000/users">http://localhost:3000/user</a></li>
    <li><strong>Method HTTP:</strong> POST</li>
    <li><strong>JSON example:</strong></li>
  </ul>
  
  ```bash 
    {
      "name": "anymail",
      "email": "test@gmail.com",
      "password": "Abc@123"
    }
  ```
  
  <h3>Login User</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="http://localhost:3000/login">http://localhost:3000/login</a></li>
    <li><strong>Method HTTP:</strong> POST</li>
    <li><strong>JSON example:</strong></li>
  </ul>

  ```bash 
    {
      "email": "test@gmail.com",
      "password": "Abc@123"
    }
  ```

  <h3>Sign a new TODO</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="http://localhost:3000/createtodo">http://localhost:3000/createtodo</a></li>
    <li><strong>Method HTTP:</strong> POST</li>
    <li><strong>JSON example:</strong></li>
  </ul>

  ```bash 
    {
    "Description": "Buy clothes"
    }
  ```
<li> To sign a TODO, you need to authenticate with the JWT token, which you get when you log in, and pass it in the BEARER TOKEN. If it's valid, the TODO will be signed in.</li>

  <h3>List all TODO</h3>

  <ul>
    <li><strong>Rota:</strong> <a href="http://localhost:3000/findAll">http://localhost:3000/findAll</a></li>
    <li><strong>Method HTTP:</strong> GET</li>
    <li><strong>JSON example:</strong></li>
  </ul>
  <li> To list all TODO, you need to authenticate with the JWT token, which you get when you log in, and pass it in the BEARER TOKEN. If it's valid, it will list all TODO</li>

  <h3>List TODO by ID</h3>

  <ul>
    <li><strong>Rota:</strong> <a href="http://localhost:3000/findbyid/:id">http://localhost:3000/findbyid/:id</a></li>
    <li><strong>Method HTTP:</strong> GET</li>
    <li><strong>JSON example:</strong></li>
  </ul>
  <li> You need to pass the TODO's id in the header</li>
  <li> To list the TODO by ID, you need to authenticate with the JWT token, which you get when you log in, and pass it in the BEARER TOKEN. If it's valid, it will proceed</li>

  <h3>Update TODO</h3>
    <ul>
      <li><strong>Rota:</strong> <a href="http://localhost:3000/updatetodo/:id">http://localhost:3000/updatetodo/:id</a></li>
      <li><strong>Method HTTP:</strong> PATCH</li>
      <li><strong>JSON example:</strong></li>
    </ul>
    
   ```bash 
      {
      "Description": "Buy clothes"
      }
   ```

  <li> You need to pass the TODO's id in the header</li>
  <li> To update a TODO, you need to authenticate with the JWT token, which you get when you log in, and pass it in the BEARER TOKEN. If it's valid, it will proceed</li>

  <h3>Mark TODO Done</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="http://localhost:3000/markDone/:id">http://localhost:3000/markDone/:id</a></li>
    <li><strong>Method HTTP:</strong> PATCH</li>
  </ul>
  <li> You need to pass the TODO's id in the header</li>
  <li> To mark a TODO done, you need to authenticate with the JWT token, which you get when you log in, and pass it in the BEARER TOKEN. If it's valid, it will proceed</li>
  
