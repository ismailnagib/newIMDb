const express = require('express')
const router = express.Router()
const { CUGate, deleteMovie, showAll, showOne, filter } = require('../controller')

router.get('/', showAll )
router.get('/:id', showOne )
router.post('/', (req, res) => { CUGate(req, res, 'create') } )
router.post('/filter', filter )
router.put('/:id', (req, res) => { CUGate(req, res, 'update') } )
router.delete('/:id', deleteMovie )

module.exports = router;