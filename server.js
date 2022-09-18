//  endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start  app
const app = express();
// configure express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// get Route
app.get('/all', (req, res) => {
  res.send(projectData);
});

// post Route
app.post('/send', (req, res) => {
  const { temperature, date, userFeedback } = req.body;
  projectData.temperature = temperature;
  projectData.date = date;
  projectData.userFeedback = userFeedback;

  res.send(projectData);
});

// Setup The Server
const port =  8000;

app.listen(port, () => console.log(`listening on server ${port}...`));
