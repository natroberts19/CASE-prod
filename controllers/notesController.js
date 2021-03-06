// -------------------------------------------------------
// Defining methods for the notesController.
// -------------------------------------------------------

const db = require("../models");

module.exports = {

// POST route for saving a new Note to the database and associating it with a Student.
// If the new Note is created, find the student and push the note to the notes array in the Student model.
    postNote: function(req, res) {
        console.log("postNote body notes controller: ", req.body);
        console.log("postNote student req notes controller: ", req.params.id);
        db.Note
        .create(req.body)
        .then(dbNote => {
            console.log("create dbNote notes controller: ", dbNote);
            db.Student.findOneAndUpdate({_id: req.params.id }, { $push: {notes: dbNote._id } }, { new: true })
            .then(dbStudent => res.json(dbStudent))
            .catch(err => res.status(422).json(err))
        })
        
    }
}