let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Movies = require('../db').import('../models/movies');
const movies = require("../models/movies");

router.post('/create', validateSession, (req, res) => {  /*12.3.3*/
    const movieEntry = {
        title: req.body.movies.title,
        runtime: req.body.movies.runtime,
        description: req.body.movies.description,
        actors: req.body.movies.actors,
        rating: req.body.movies.rating,
        stars: req.body.movies.stars,
        ownerid: req.user.id,
    }
    Movies.create(movieEntry)
        .then((movies) => res.status(200).json(movies))
        .catch((err) => res.status(502).json({ error: err }))
});
/* GET ALL ENTRIES */
router.get("/", (req, res) => {
    Movies.findAll()
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).json({ error: err }))
});
/* GET ENTRIES BY USER */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Movies.findAll({
        where: { ownerid: userid }
    })
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).json({ error: err }))
});
/* GET ENTRIES BY ID */
router.get("/:id", validateSession, (req, res) => {
    let id = req.params.id
    Movies.findAll({
        where: { id: id },
    })
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).json({ error: err }))
});
/* 12.3.5 - UPDATING JOURNAL ENTRY */
router.put("/:id", validateSession, function (req, res) {
    const updateMoviesEntry = {
        title: req.body.movies.title,
        runtime: req.body.movies.runtime,
        description: req.body.movies.description,
        actors: req.body.movies.actors,
        rating: req.body.movies.rating,
        stars: req.body.movies.stars,
        ownerid: req.user.id,
    };

    const query = { where: { id: req.params.id, ownerid: req.user.id } };

    Movies.update(updateMoviesEntry, query)
        .then((movies) => res.status(200).json(movies))
        .catch((err) => res.status(500).json({ error: err}));
});
/* 12.3.6 - DELETE JOURNAL ENTRY */
router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, ownerid: req.user.id } };

    Movies.destroy(query)
        .then(() => res.status(200).json({ message: "Movie deleted" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
