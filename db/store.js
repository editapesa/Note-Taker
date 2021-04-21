const util = require('util');
const fs = require('fs');

const generateUniqueId = require('../node_modules/generate-unique-id');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
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