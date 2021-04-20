const util = require('util');
const fs = require('fs');

const generateUniqueId = require('../routes/node_modules/generate-unique-id');

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
        return this.read().then((notes));
    }
    addNote(note) {
        const { title, text } = note;
        let newNote = { title, text, id: generateUniqueId() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((revisedNotes) => this.write(revisedNotes))
            .then(() => newNote);
    }
}

module.exports = new Store();