const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

hash = crypto.getHashes();
app.use(cors());

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));