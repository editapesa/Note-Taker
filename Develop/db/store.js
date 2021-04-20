const util = require('util');
const fs = require('fs');

const generateUniqueId = require('generate-unique-id');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes));
    }
    addNote(note) {
        let note = { title, text };
        let newNote = { title, text, id: generateUniqueId() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((revisedNotes) => this.write(revisedNotes))
            .then(() => newNote);
    }
}

module.exports = new Store();