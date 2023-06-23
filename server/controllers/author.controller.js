const Author = require('../models/author.model');

module.exports = {
    findAll: (request, response) => {
        Author.find({})
            .then(allAuthors => response.json(allAuthors))
            .catch(err => response.status(400).json(err))
    },

    create: (request, response) => {
        const { name } = request.body;
        Author.create({
            name: name
        })
            .then(newAuthor => response.json(newAuthor))
            .catch(err => {
                if (err.code === 11000) {
                    response.status(400).json({ message: "Name must be unique" });
                } else {
                    response.status(400).json(err);
                }
            })
    },

    findOne: (request, response) => {
        Author.findOne({ _id: request.params.id })
            .then(oneAuthor => response.json(oneAuthor))
            .catch(err => response.status(400).json(err))
    },

    update: (request, response) => {
        const { name } = request.body;
        Author.findOneAndUpdate({ _id: request.params.id }, {
            name: name
        }, { new: true, runValidators: true }) // runValidators ensures that the update operation respects the schema validation
            .then(updatedAuthor => response.json(updatedAuthor))
            .catch(err => {
                if (err.code === 11000) {
                    response.status(400).json({ errors: { name: { message: "Name must be unique" } }});
                } else {
                    response.status(400).json(err);
                }
            })
    },

    delete: (request, response) => {
        Author.deleteOne({ _id: request.params.id })
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.status(400).json(err))
    }
}
