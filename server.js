const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');

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
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');

  next();
});

const dbPath = path.join(__dirname, 'db.json');

function readDB(callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      try {
        callback(null, JSON.parse(data));
      } catch (parseError) {
        callback(parseError, null);
      }
    }
  });
}

function writeDB(data, callback) {
  fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8', callback);
}

app.get('/room', (req, res) => {
  readDB((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    let rooms = data.rooms;

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

    setTimeout(() => {
      res.json({
        data: paginatedRooms,
        total
      });
    }, 1000);
  });
});

app.post('/room', (req, res) => {
  readDB((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    const newRoom = req.body;
    if (!('name' in newRoom) || !('capacity' in newRoom) || !('occupancy' in newRoom) || !('floor', newRoom)) {
      return res.status(400).json({ error: 'Missing required room properties' });
    }

    newRoom.id = faker.string.uuid();
    newRoom.image = faker.image.urlPlaceholder({ width: 240, height: 180, text: '' });
    data.rooms.unshift(newRoom);

    writeDB(data, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving data' });
      }
      res.status(201).json(newRoom);
    });
  });
});

app.patch('/room/:id', (req, res) => {
  readDB((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    const roomId = req.params.id;
    const updatedRoom = req.body;

    const index = data.rooms.findIndex(room => room.id === roomId);
    if (index === -1) {
      return res.status(404).json({ error: 'Room not found' });
    }

    data.rooms[index] = { ...data.rooms[index], ...updatedRoom };

    writeDB(data, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving data' });
      }
      res.json(data.rooms[index]);
    });
  });
});

app.delete('/room/:id', (req, res) => {
  readDB((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data' });
    }

    const roomId = req.params.id;
    const index = data.rooms.findIndex(room => room.id === roomId);
    if (index === -1) {
      return res.status(404).json({ error: 'Room not found' });
    }

    data.rooms.splice(index, 1);

    writeDB(data, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving data' });
      }
      res.status(204).send();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
