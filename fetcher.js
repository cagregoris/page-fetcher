const fs = require('fs');
const request = require('request');


const commandLineInput = process.argv.slice(2);
const link = commandLineInput[0];
const file = commandLineInput[1];

request(link, (error, response, body) => {
  console.log('error:', error); // print error if one occurred
  console.log('statusCode:', response && response.statusCode); // print the response status code if a response was received
  console.log('body:', body); // print the HTML for the Google homepage.
  
  if(!error) {
    fs.writeFile(file, body, (error) => {
      if (!error) {
        fs.stat(file, (error, fileStats) => {
          if (!error) {
            console.log(`Downloaded and saved ${fileStats.size} bytes to ${file}`)
          } else {
            console.log('File size could not be obtained')
          }
        });
      } else {
        console.log("Failed to write to file");
      }
    });
  }
})
