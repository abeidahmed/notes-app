const fs = require("fs");
const chalk = require("chalk");

// Add note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase());
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(`Added a note with the title: ${title}`);
  } else {
    console.log(`Duplicate found with the title: ${title}`);
  }
};

// Remove note
const removeNote = title => {
  const notesArray = loadNotes();
  const toAdd = notesArray.filter(noteItem => {
    return noteItem.title.toLowerCase() !== title.toLowerCase();
  });

  saveNotes(toAdd);

  if (notesArray.length !== toAdd.length) {
    console.log(chalk.green.bold("Note removed!"));
  } else {
    console.log(chalk.red.bold("No note found!"));
  }
};

// List notes
const listNotes = () => {
  const notesArray = loadNotes();
  console.log(chalk.magenta("Your notes..."));
  notesArray.forEach((note, index) => {
    const { title, body } = note;
    console.log(`${index + 1} - Title: ${title}, Body: ${body}`);
  });
};

// Read notes
const readTitle = title => {
  const notes = loadNotes();
  const getNotes = notes.find(note => note.title.toLowerCase() === title.toLowerCase());
  if (getNotes) {
    console.log(chalk.magenta.bold(`Title: ${getNotes.title}`));
    console.log(`${getNotes.body}`);
  } else {
    console.log(chalk.red.bold("No notes of that title"));
  }
};

const saveNotes = notes => {
  const dataStringify = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataStringify);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readTitle: readTitle
};
