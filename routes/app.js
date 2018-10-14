const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const algoliasearch = require('algoliasearch');
require('dotenv').config();
const SC = require('node-soundcloud');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

router.get('/', function (req, res, next) {
  res.render('index.html');
});

router.get('/token', function (req, res, next) {
  const { id, firstName, lastName, genre, start, end } = req.query;
  res.json(jwt.sign({
    id: id || uuid,
    first_name: firstName,
    last_name: lastName,
    genre: genre,
    start: start,
    end: end
  }, process.env.JWT_TOKEN))
});

router.get('/queries', function (req, res, next) {
  firebase.database().ref('/queries').once('value', queries => {
    const records = [];
    queries.forEach(query => {
      records.push(query.key);
    });
    res.json(records);
  });
});

router.get('/songs/:genre', function (req, res, next) {
  firebase.database().ref(`/songs/${req.params.genre}`).once('value', songs => {
    const records = [];
    songs.forEach(function (song) {
      // get the key and data from the snapshot
      const childKey = song.key;
      const childData = song.val();
      // We set the Algolia objectID as the Firebase .key
      childData.id = childKey;
      // Add object for indexing
      records.push(childData);
    });
    res.json(records);
  });
});

router.put('/song/:genre', async function (req, res, next) {
  const {id} = req.body;
  delete req.body.id;
  await firebase.database().ref(`/songs/${req.params.genre}/${id}`).update(req.body).then(() => {
    res.json();
  });
});

router.post('/songs', function (req, res, next) {
  const {apiKey, limit, offset, query, license} = req.body;
  SC.init({
    id: apiKey
  });

  SC.get(`/tracks?q=${query}&limit=${limit}&offset=${offset}&license=${license}`, (err, tracks) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const tracksFormatted = {};
      for (let i = 0; i < tracks.length; i++) {
        const id = tracks[i].id;
        console.log(id);
        delete tracks[i].id;
        tracksFormatted[id] = JSON.parse(JSON.stringify(tracks[i]));
        tracks[i].objectID = id;
      }
      const queries = {};
      queries[query] = 1;
      firebase.database().ref('/queries').update(queries);
      firebase.database().ref('/songs/' + query).update(tracksFormatted);
      index.saveObjects(tracks)
        .then(function () {
          console.log('Songs imported into Algolia');
          res.json();
        })
        .catch(function (err) {
          console.error('Error when importing songs into Algolia', err);
          res.status(500).json(err);
        });
    }
  });
});

module.exports = router;
