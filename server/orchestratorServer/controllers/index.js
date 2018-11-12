const axios = require('axios')
const redisClient = require('redis').createClient()

module.exports = {

    showAll (req, res) {

        redisClient.get('all-data', (err, data) => {
            if (err) {
                res.status(500).json(err.response.data)
            } else if (data) {
                res.status(200).json(JSON.parse(data))
            } else {
                
                let movies = axios({
                    url: 'http://localhost:3001'
                })
                
                let tvs = axios({
                    url: 'http://localhost:3002'
                })
                
                Promise.all([movies, tvs])
                .then(allData => {
                    let movies = allData[0].data
                    let tvs = allData[1].data
                    redisClient.set('all-data', JSON.stringify({movies: movies, tvs: tvs}), 'EX', 3600)
                    res.status(200).json({movies: movies, tvs: tvs})
                })
                .catch(err => {
                    res.status(500).json(err.response.data)
                })
            }
        })
    }
}