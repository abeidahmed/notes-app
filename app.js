// const fs = require("fs");
// fs.writeFileSync("note.txt", "Hello mama kane");
// fs.appendFileSync("note.txt", " Append works?");

// const fs = require("fs");
// const validator = require("validator");
// const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");
// const log = console.log;

// const emailString = "helloworldexample.com";

// function fieldValidation() {
//   if (validator.isEmail(emailString)) {
//     log(chalk.green.bold("Indeed it is an email!"));
//   } else {
//     log(chalk.magenta.bold("Sorry, not an email!"));
//   }
// }

// fieldValidation();

// const command = yargs.argv;
// if (command.hasOwnProperty("title")) {
//   const title = command.title;
//   if (title.length > 1) {
//     for (let i = 0; i < title.length; i++) {
//       console.log(chalk.magenta.bold(`${i + 1}: ${title[i]}`));
//     }
//   } else {
//     console.log(chalk.green.bold(`Single title: ${title}`));
//   }
// } else {
//   console.log(chalk.red.bold("You need to provide atleast one title"));
// }

// yargs.version("2.0.0");

// Create command
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    // console.log(`Title: ${argv.title}, Body: ${argv.body}`);
    // fs.writeFileSync("notes.txt", `Title: ${argv.title}, Body: ${argv.body}`);
    const { title, body } = argv;
    notes.addNote(title, body);
  }
});

// Remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.removeNote(argv.title);
  }
});

// List command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler: () => {
    notes.listNotes();
  }
});

// Read command
yargs.command({
  command: "read",
  describe: "Read your notes",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.readTitle(argv.title);
  }
});

yargs.parse();
