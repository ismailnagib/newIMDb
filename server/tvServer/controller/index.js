const TVS = require('../models/tvsModel')
const Tag = require('../models/tagModel')

async function createTag (tag, res, cb) {
    for (let index = 0; index < tag.length; index++) {
        await
            Tag.findOne({
                text: tag[index]
            })
            .then(async (data) => {
                if (data) {
                    await cb(data._id)
                } else {
                    await
                        Tag.create({ text: tag[index] })
                        .then(newTag => {
                            cb(newTag._id)
                        })
                        .catch(err => {
                            res.status(500).json({info: 'An error has occured', error: err})
                        })
                }
            })
            .catch(err => {
                res.status(500).json({info: 'An error has occured', error: err})
            })
    }
}

function createTVS (req, res) {
    TVS.create(req.body)
    .then(data => {
        res.status(200).json({info: 'TV series data successfully added', data})
    })
    .catch(err => {
        res.status(500).json({info: 'An error has occured', error: err})
    })
}

function updateTVS (req, res) {
    TVS.updateOne({
        _id: req.params.id
    }, req.body)
    .then(() => {
        res.status(200).json({info: 'TV series data successfully updated'})
    })
    .catch(err => {
        res.status(500).json({info: 'An error has occured', error: err})
    })
}

module.exports = {

    async CUGate (req, res, type) {
        const { tag } = req.body
        if (tag) {
            let validTag = []
            if (typeof tag === 'string') {
                validTag.push(tag)
            } else {
                validTag = tag.slice()
            }
            let tagArr = []
            await createTag(validTag, res, async (tagId) => {
                await tagArr.push(tagId)
            })
            req.body.tag = tagArr
            if (type === 'create') {
                createTVS(req, res)
            } else {
                updateTVS(req, res)
            }
        } else {
            req.body.tag = []
            if (type === 'create') {
                createTVS(req, res)
            } else {
                updateTVS(req, res)
            }
        }
    },

    deleteTVS (req, res) {
        TVS.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res.status(200).json({info: 'TV series data successfully deleted'})
        })
        .catch(err => {
            res.status(500).json({info: 'An error has occured', error: err})
        })
    },

    showAll (req, res) {
        TVS.find()
        .populate('tag')
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({info: 'TV series data successfully found', data})
            } else {
                res.status(200).json({info: 'Sorry, but there is nothing here right now'})
            }
        })
        .catch(err => {
            res.status(500).json({info: 'An error has occured', error: err})
        })
    },

    showOne (req, res) {
        TVS.findById(req.params.id)
        .populate('tag')
        .then(datum => {
            if (datum) {
                res.status(200).json({info: 'TV series datum successfully found', datum})
            } else {
                res.status(200).json({info: 'Sorry, but we can not find anything with that id, maybe the datum was deleted or never there on the first place'})
            }
        })
        .catch(err => {
            res.status(500).json({info: 'An error has occured', error: err})
        })
    },

    filter (req, res) {
        const { title, tag } = req.body
        if (title) {
            req.body.title = new RegExp(title, 'i')
        }
        if (tag) {
            let validTag = []
            if (typeof tag === 'string') {
                validTag.push(tag)
            } else {
                validTag = tag.slice()
            }
            let tagIdArr = []
            Tag.find({
                text: {
                    $in: validTag
                }
            })
            .then((data) => {
                if (validTag.length !== data.length) {
                    res.status(200).json({info: 'Sorry, but we can not find anything like that'})
                } else {
                    for (let i = 0; i < data.length; i++) {
                        tagIdArr.push(data[i]._id)
                    }
                    req.body.tag = {
                        $all: tagIdArr
                    }
                    find()
                }
            })
            .catch(err => {
                res.status(500).json({info: 'An error has occured', error: err})
            })
        } else {
            find()
        }

        function find () {
            TVS.find(req.body)
            .populate('tag')
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({info: 'TV series data successfully found', data})
                } else {
                    res.status(200).json({info: 'Sorry, but we can not find anything like that'})
                }
            })
            .catch(err => {
                res.status(500).json({info: 'An error has occured', error: err})
            })
        }
    }
}