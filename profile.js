"use strict";

const https = require('https');

function printMessage(username, badgeCount, points){
  let message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function printError(error){
  console.log(error.message);
}

function get(username){
  let url = `https://teamtreehouse.com/${username}.json`
  let request = https.get(url, function(response){
    console.log(response.statusCode);
    let body = "";
    response.on('data', function(chunk){
      body += chunk;
    });

    response.on('end', function(){
      if (response.statusCode === 200){
        try {
          let profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);  
        }
        catch(error){
          printError(error);
        }
      } else {
        printError({message: "There was an error getting profile for " + username + "."})
      }
    });
  });

  request.on('error', printError);
}

module.exports.get = get;