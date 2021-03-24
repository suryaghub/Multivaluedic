#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {
  addKey,
  updateDictionary,
  findKeys,
  getMembers,
  removeMember,
  removeAllKV,
  clearAll

} = require('./index');

// Prompt Questions
const questions = [
  {
    type: 'input',
    name: 'key',
    message: 'Enter Dictionary Key'
  },
  {
    type: 'input',
    name: 'members',
    message: 'Enter Dictionary Member'
  }
];

program 
  .version('1.0.0')
  .description('Dictionary Management System')


// Add Command
program
  .command('add')
  .alias('a')
  .description('Add a Key')
  .action(() => {
    prompt(questions).then(dict => {
      addKey(dict);
    }
    )
  });

  // Remove Command
program
  .command('remove')
  .alias('r')
  .description('Remove a member')
  .action(() => {
    prompt(questions).then(dict => {
      removeMember(dict);
    }
    )
  });

//Removeall Command
program
  .command('removeall')
  .alias('rall')
  .description('Remove all values from a key')
  .action(() => {
    prompt(questions[0]).then(dict => {
      removeAllKV(dict);
    }
    )
  });

  //Clear Command
program
.command('clear')
.alias('rall')
.description('Remove all values from a key')
.action(() => {
  prompt(questions[0]).then(dict => {
    clearAll (dict);
  }
  )
});

// Find Keys Command
program
  .command('keys')
  .alias('k')
  .description('find keys')
  .action(()=>findKeys());

// Find Members  Command
program
  .command('members')
  .alias('m')
  .description('find members')
  .action(()=>{
    prompt(questions[0]).then(key => {
      getMembers(key);
    })
  });

// Update Command
program
  .command('update <_id>')
  .alias('u')
  .description('Update a dictionary')
  .action(_id => {
    prompt(questions).then(answers => updateDictionary(_id, answers));
  });


program.parse(process.argv);