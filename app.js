"use strict";

const profile = require('./profile');

let users = process.argv.slice(2);

users.forEach(profile.get);