const axios = require('axios')
const redisClient = require('redis').createClient()

module.exports = {
    
    showAll (req, res) {
        redisClient.get('movie-all', (err, data) => {
            if (err) {
                res.status(500).json(err.response.data)
            } else if (data) {
                res.status(200).json(JSON.parse(data))
            } else {
                axios({
                    url: 'http://localhost:3001'
                })
                .then(({ data }) => {
                    redisClient.set('movie-all', JSON.stringify(data), 'EX', 3600)
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.response.data)
                })
            }
        })
    },

    showOne (req, res) {
        axios({
            url: `http://localhost:3001/${req.params.id}`
        })
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    create (req, res) {
        axios({
            url: `http://localhost:3001`,
            method: 'post',
            data: req.body
        })
        .then(({ data }) => {
            redisClient.del('movie-all')
            redisClient.del('all-data')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    filter (req, res) {
        axios({
            url: `http://localhost:3001/filter`,
            method: 'post',
            data: req.body
        })
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    update (req, res) {
        axios({
            url: `http://localhost:3001/${req.params.id}`,
            method: 'put',
            data: req.body
        })
        .then(({ data }) => {
            redisClient.del('movie-all')
            redisClient.del('all-data')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    remove (req, res) {
        axios({
            url: `http://localhost:3001/${req.params.id}`,
            method: 'delete',
        })
        .then(({ data }) => {
            redisClient.del('movie-all')
            redisClient.del('all-data')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    }
}