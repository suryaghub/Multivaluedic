const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to db
const db = mongoose.connect('mongodb+srv://SuryaX:SuryaX@cluster0.4liqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true }
);

// Import model
const KeyVal = require('./models/dictionary');

// Add Key
const addKey= (dict)=>{
  const search = new RegExp(dict.key, 'i');
  KeyVal.find({key: search})
    .then(results => {
     // console.log(results);
      if(results.length>0){
        results[0]['members'].push(dict['members']);
        updateDictionary(results[0]['_id'],results[0]);
      }
      else{
        KeyVal.create(dict).then(dict => {
          console.info('New Key Added');
        });
      }
    });
}


const findKeys = ()=>{
  KeyVal.find()
    .then(keys => {
      keys.forEach((key)=>{
        console.log(key['key']);
      })
    });
}

// Update Dictionary
const updateDictionary = (_id, customer) => {
  KeyVal.update({ _id }, customer)
    .then(customer => {
      console.info('Dictionary Updated');
    });
}


const getMembers=(dictKey)=>{
  const search = new RegExp(dictKey.key, 'i');
  KeyVal.find({key: dictKey.key})
    .then(results => {
      if(results.length>0){
        results[0]['members'].forEach((member)=>{
          console.log(member);
        })
      }
      else{
        console.info('Key does not exist.');
      }
    });
}

//Remove Member

const removeMember = (dict)=>{
  KeyVal.find({key: dict.key})
    .then(results => {
      if(results.length>0){
        let memberExists = false;
        results[0]['members'].forEach((member)=>{
          if(member==dict.members){
            memberExists = true;
          }
        })
        if(memberExists){
          results[0]['members'].remove(dict.members);
          updateDictionary(results[0]['_id'],results[0]);
          console.log("Removed");
        }
        else{
          console.log("Value does not exist");
        }
      }
      else{
        console.info('Key does not exist.');
      }
    });
}

// RemoveAll Keys and its Values

const removeAllKV = (dict)=>{
  KeyVal.find({key: dict.key})
    .then(results => {
      if(results.length>0){
        //let memberExists = false;
        //results[0]['members'].forEach((member)=>{
        //  if(member==dict.members){
        //    memberExists = true;
         // }
       // })
        //if(memberExists){
          results[0]['members'].remove(dict.members);
          results[0]['keys'].remove(dict.keys);
          updateDictionary(results[0]['_id'],results[0]);
          console.log("Removed");
        //}
       // else{
        //  console.log("Value does not exist");
       // }
      }
      else{
        console.info('Key does not exist.');
      }
    });
}

// Clear all Keys and their Values

const clearAll = (dict)=>{
  KeyVal.find({key: dict.key})
    .then(results => {
      if(results.length>0){
        let memberExists = false;
        results[0]['members'].forEach((member)=>{
          if(member==dict.members){
            memberExists = true;
          }
        })
        if(memberExists){
          results[0]['members'].remove(dict.members);
          updateDictionary(results[0]['_id'],results[0]);
          console.log("Removed");
        }
        else{
          console.log("Value does not exist");
        }
      }
      else{
        console.info('Key does not exist.');
      }
    });
}


// Export All Methods
module.exports = {
  addKey,
  updateDictionary,
  findKeys,
  getMembers,
  removeMember,
  removeAllKV,
  clearAll
}