const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

  var whiteList = [
    '*',
    'http:// localhost:4200'
  ];

  var origen = req.headers.origin;

  if (whiteList.indexOf(origen) >= -1) {
    res.header('Access-Control-Allow-Origin', origen);
  }

  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.get('/rooms', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    try {
      let rooms = JSON.parse(data).rooms;

      const { name, capacity, occupancy, floor, page = 1, offset = 10 } = req.query;

      if (name) {
        rooms = rooms.filter(room => room.name && room.name.toLowerCase().includes(name.toLowerCase()));
      }

      if (capacity) {
        rooms = rooms.filter(room => room.capacity === Number(capacity));
      }

      if (occupancy) {
        rooms = rooms.filter(room => room.occupancy === Number(occupancy));
      }

      if (floor) {
        const floors = JSON.parse(floor);
        rooms = rooms.filter(room => room.floor && floors.includes(room.floor));
      }

      const total = rooms.length;

      const start = (Number(page) - 1) * Number(offset);
      const end = start + Number(offset);
      const paginatedRooms = rooms.slice(start, end);

      res.json({
        data: paginatedRooms,
        total
      });

    } catch (parseError) {
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});