# PERN-Starter-Template
Starter template, using PERN stack, keeping backend and frontend in seperate directories. 

BACKEND directory:

Commands:
Commands in BACKEND directory!
npm install (installs all dependencies found in package.json)

npm install supertest --save-dev (for testing) (scripts in package.json)


PRISMA:
npm install prisma --save-dev
npm install @prisma/client
npx prisma init  (makes prisma folder)
npm install @quixo3/prisma-session-store  https://github.com/kleydon/prisma-session-store#readme   (set up Session Model in Prisma) 


npx prisma generate (after making schema)
npx prisma migrate dev (after making changes to schema)
 ----------------------------------------------------------------------
FRONTEND directory:

Design: Keep CSS inline or modular

npm install - sets up all node modules (installs all dependencies)

npm run dev - starts vite server

If using React to setup up default frontend directory run: 
npm create vite@latest . -- --template react


This template uses Prisma ORM supporting PostgreSQL. 
Prisma Setup Guide: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql 
or use quick commands: 
 ---> npx prisma init  (then after adding DATABASE_URL to .env)  ---> npx prisma migrate dev --name init  ---> npx prisma generate

Don't forget to setup .env where variables such as DATABASE_URL(where data is being served) will go
.gitignore has .env and /generated/schema to ignore from public 

Using PostMan Web Agent (for full API functionality): https://learning.postman.com/docs/getting-started/installation/installation-and-updates/#install-postman-on-linux   (after installing with snap command, just run 'postman' as a command to launch)

npm install -g nodemon --live view? 

Linter & Prettier Commands
npm install --save-dev eslint
npx eslint --init   (Optional for configuration)  

Linting commands
- Run: npx eslint .
- Fix: npx eslint . --fix

Prettier commands
- npm install --save-dev prettier
- touch .prettierrc  (Optional config file for tab space, ect. )


This template encourages using small layout primitives to manage spacing and responsiveness instead of hard-coded margins or excessive media queries.

Using Primitive Component Examples:

```jsx

<Shell>
  <Stack>
    <h1>Page Title</h1>

    <Cluster>
      <Button />
      <Button />
      <Button />
    </Cluster>

    <Content />
  </Stack>
</Shell>

another example
<Shell>
  <Stack>
    <Header />
    <Cluster>
      <FilterTag />
      <FilterTag />
      <FilterTag />
    </Cluster>
    <Content />
  </Stack>
</Shell>

detailed example (*Section and Main content being semantic tags*)

<Shell>
  <Stack>
    <PageHeader>
      <h1>Dashboard</h1>
      <p>Overview of your recent activity</p>
    </PageHeader>

    <MainContent>
      <Stack>
        <Section>
          <h2>Quick Stats</h2>
          <Grid>
            <StatCard />
            <StatCard />
            <StatCard />
          </Grid>
        </Section>

        <Section>
          <h2>Recent Items</h2>
          <Stack>
            <ItemRow />
            <ItemRow />
            <ItemRow />
          </Stack>
        </Section>
      </Stack>
    </MainContent>

    <Footer />
  </Stack>
</Shell>
