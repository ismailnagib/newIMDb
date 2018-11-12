const express = require('express')
const router = express.Router()
const { showAll, showOne, create, filter, update, remove } = require('../controllers/tvs')

router.get('/', showAll)
router.get('/:id', showOne )
router.post('/', create )
router.post('/filter', filter )
router.put('/:id', update )
router.delete('/:id', remove )

module.exports = router