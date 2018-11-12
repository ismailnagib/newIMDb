const axios = require('axios')
const redisClient = require('redis').createClient()

module.exports = {
    
    showAll () {
        return new Promise((resolve, reject) => {
            redisClient.get('tvs-all', (err, data) => {
                if (err) {
                    reject(err.response.data)
                } else if (data) {
                    resolve(JSON.parse(data))
                } else {
                    axios({
                        url: 'http://localhost:3002'
                    })
                    .then(({ data }) => {
                        redisClient.set('tvs-all', JSON.stringify(data.data))
                        resolve(data.data)
                    })
                    .catch(err => {
                        reject(err.response.data)
                    })
                }
            })
        })
    },

    showOne (req, res) {
        axios({
            url: `http://localhost:3002/${req.params.id}`
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
            url: `http://localhost:3002`,
            method: 'post',
            data: req.body
        })
        .then(({ data }) => {
            redisClient.del('tvs-all')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    filter (req, res) {
        axios({
            url: `http://localhost:3002/filter`,
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
            url: `http://localhost:3002/${req.params.id}`,
            method: 'put',
            data: req.body
        })
        .then(({ data }) => {
            redisClient.del('tvs-all')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    remove (req, res) {
        axios({
            url: `http://localhost:3002/${req.params.id}`,
            method: 'delete',
        })
        .then(({ data }) => {
            redisClient.del('tvs-all')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    }
}