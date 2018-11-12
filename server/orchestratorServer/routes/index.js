var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send(
        `<p style="text-align: center; margin-top: 25vh; font-size: 20px">
        The server is running on port ${ process.env.PORT || 3000 }.<br><br><br>
        For movie data, please check out <a style='text-decoration: none' href='/movies'>/movies</a>.<br><br>
        For TV series data, please check out <a style='text-decoration: none' href='/tvs'>/tvs</a>.
        </p>`)
});

module.exports = router;