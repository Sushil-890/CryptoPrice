const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const approuter = require('./Routers/AuthRouter');

const app = express();
const PORT = process.env.PORT || 5000;
require('./Models/dbconfig');
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', approuter);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*any', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
