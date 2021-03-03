let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Movies = require('../db').import('../models/movies');

router.post('/create', validateSession, (req, res) => {  /*12.3.3*/
    const movieEntry = {
        title: req.body.movies.title,
        runtime: req.body.movies.runtime,
        description: req.body.movies.description,
        actors: req.body.movies.actors,
        rating: req.body.movies.rating,
        ownerid: req.user.id,
    }
    Movies.create(movieEntry)
        .then((movies) => res.status(200).json(movies))
        .catch((err) => res.status(502).json({ error: err }))
});

router.get("/", validateSession, (req, res) => {
    Movies.findAll()
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).json({ error: err }))
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Movies.findAll({
        where: { ownerid: userid }
    })
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).json({ error: err }))
});

router.get("/:id", validateSession, (req, res) => {
    let id = req.params.id
    Movies.findAll({
        where: { id: id },
    })
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).json({ error: err }))
});

router.put("/:id", validateSession, function (req, res) {
    const updateMoviesEntry = {
        title: req.body.movies.title,
        runtime: req.body.movies.runtime,
        description: req.body.movies.description,
        actors: req.body.movies.actors,
        rating: req.body.movies.rating,
        review: req.body.movies.review,
        stars: req.body.movies.stars,
        ownerid: req.user.id
    };

    const query = { where: { id: req.params.id, ownerid: req.user.id } };

    Movies.update(updateMoviesEntry, query)
        .then((movies) => res.status(200).json(movies))
        .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, ownerid: req.user.id } };

    Movies.destroy(query)
        .then(() => res.status(200).json({ message: "Movie deleted" }))
        .catch((err) => res.status(500).json({ error: err }));
});

// router.put('/review/:id', validateSession, (req, res) => {
//     const movieToReview = {
//         review: req.body.movies.review,
//         stars: req.body.movies.stars
//     }

//     const query = { where: { id: req.params.id, ownerid: req.user.id }};

//     Movies.update(movieToReview, query)
//         .then((review) => res.status(200).json(review))
//         .catch((err) => res.status(500).json({ error: err }))
// });

module.exports = router;