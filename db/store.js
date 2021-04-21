const fs = require('fs');
const generateUniqueId = require('../node_modules/generate-unique-id');

class Store {
    read() {
        return fs.readFile('db/db.json');
    }
    write(note) {
        return fs.writeFile('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return (this.read())
    }
    addNote(note) {
        const { title, text } = note;
        const newNote = { title, text, id: generateUniqueId() };
        return this.getNotes()
            .then((notes) => {
                if (notes.length) return notes.concat(newNote)
                else return [newNote]
            })
            .then((revisedNotes) => {
                this.write(revisedNotes)
                return revisedNotes;
            })
            .then(() => newNote);
    }
}

module.exports = new Store();