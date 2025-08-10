// express-skills-showcase.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3003;

// --- Middleware ---
// Логування простих запитів
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Статичні файли (покажемо як працює)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Парсинг JSON і urlencoded тіла запитів
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---

// Головна сторінка
app.get('/', (req, res) => {
  res.send(`
    <h1>Express.js Skills Showcase 🚀</h1>
    <ul>
      <li><a href="/hello">Hello Route</a></li>
      <li><a href="/user/john">Route Params Example</a></li>
      <li><a href="/query?name=Danilo">Query Params Example</a></li>
      <li><a href="/json">JSON Response</a></li>
      <li><a href="/error">Error Handling Demo</a></li>
      <li><a href="/form">POST Form Demo</a></li>
    </ul>
    <p>Static files available at <a href="/static/sample.txt">/static/sample.txt</a></p>
  `);
});

// Проста відповідь
app.get('/hello', (req, res) => {
  res.send('Hello from Express.js!');
});

// Route Params
app.get('/user/:username', (req, res) => {
  const { username } = req.params;
  res.send(`User Profile Page for: ${username}`);
});

// Query Params
app.get('/query', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}! You passed query parameters.`);
});

// JSON API відповідь
app.get('/json', (req, res) => {
  res.json({
    success: true,
    message: "This is a JSON response from Express.js",
    timestamp: new Date().toISOString(),
  });
});

// GET форма
app.get('/form', (req, res) => {
  res.send(`
    <form action="/form" method="POST">
      <input name="message" placeholder="Type something" />
      <button type="submit">Send</button>
    </form>
  `);
});

// POST обробка форми
app.post('/form', (req, res) => {
  const { message } = req.body;
  res.send(`You sent: ${message}`);
});

// Роут, що викликає помилку (демо error middleware)
app.get('/error', (req, res, next) => {
  const err = new Error('This is a demo error!');
  err.status = 500;
  next(err);
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error('Error middleware caught:', err.message);
  res.status(err.status || 500);
  res.send(`
    <h1>Error occurred</h1>
    <p>Status: ${err.status || 500}</p>
    <p>Message: ${err.message}</p>
    <a href="/">Go back home</a>
  `);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Express.js server running at http://localhost:${PORT}`);
});
