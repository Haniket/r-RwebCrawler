const cors = require('cors');
const express = require('express');
require('dotenv').config();
const crawlerService = require('./services/crawler.service');
const app = express();
app.use(cors({
  origin: "*",
  }))
// const allowedOrigins=['https://lucky-hare-attire.cyclic.app/','http://localhost:3000','http://localhost:4200']
// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       var msg =
//         "The CORS policy for this site does not " +
//         "allow access from the specified Origin.";
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
// }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json({ extended: false }));
const path = require('path');

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
};
app.use(express.static(path.join(__dirname, 'client/dist'), options));

// #############################################################################
// Catch all handler for all other request.
// app.use('*', (req,res) => {
//   res.json({
//       at: new Date().toISOString(),
//       method: req.method,
//       hostname: req.hostname,
//       ip: req.ip,
//       query: req.query,
//       headers: req.headers,
//       cookies: req.cookies,
//       params: req.params
//     })
//     .end()
// })

app.get('/', (req, res) => res.send('server is active'));
app.get('/makeMap', crawlerService.getLinks);
app.get('/resetMap', crawlerService.resetMap);
app.get('/getUrlCount', crawlerService.getUrlCounts);
app.get('/getLinkedUrls', crawlerService.getLinkedUrls);
app.get('/getAllDomain', crawlerService.getAllDomain);
// app.get("/makeMap",(req,res)=>{
//   console.log(req);
// })
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
