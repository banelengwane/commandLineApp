#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");

const option = yargs
  .usage("Usage: -n <name>")
  .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true})
  .option("s", { alias: "search", describe: "Search term", type: "string"})
  .argv;


const greeting = `Hello, ${option.name}!`;
console.log(greeting);

if(option.search) {
    console.log(`Searching for jokes about ${option.search}...`)
} else {
    console.log("Here's a random joke for you:");
}

const url = option.search ? `https://icanhazdadjoke.com/search?term=${escape(option.search)}` : "https://icanhazdadjoke.com/";

axios.get(url, { headers: {Accept: "application/json"}})
    .then(res => {
        if(option.search) {
            // if searching for jokes, loop over the results
            res.data.results.forEach(j => {
                console.log("\n" + j.joke);
            });
            if (res.data.results.length === 0){
                console.log("no jokes found :'(");
            }
        } else {
            console.log(res.data.joke);
        }
});