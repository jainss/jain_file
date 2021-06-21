#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
let inputarr = process.argv.slice(2);
//Input
// console.log(inputarr);

let optionarr = [];
let filearr = [];
// take command with respect to file or options
for (let i = 0; i < inputarr.length; i++) {
    if (inputarr[i].charAt(0) == '-') {
        optionarr.push(inputarr[i]);
    }
    else {
        filearr.push(inputarr[i]);
    }
}
// Edge case 1;
let bothexits = optionarr.includes('-n') && optionarr.includes('-b');
if (bothexits == true) {
    console.log(chalk.red("Don't Give both commands either give -n or -d"));
    return;
}
// Edge Case 2;
for (let i = 0; i < filearr.length; i++) {
    let exitfile = fs.existsSync(filearr[i]);
    if (exitfile == false) {
        console.log(chalk.red(`The file ${filearr[i]} you enter is not value. Kindely Enter right file`));
        return;
    }
}
// Put the whole content in one variable 
let content = "";
for (let i = 0; i < filearr.length; i++) {
    let filecontent = fs.readFileSync(filearr[i]);
    content += filecontent + "\r\n";
}
// console.log(content);
let contentarr = content.split('\r\n');
// for (let i = 0; i < contentarr.length; i++) {
//     console.log(contentarr[i]);
// }

let checkfors = optionarr.includes('-s');
if (checkfors == true) {
    // make blank line a null
    for (let i = 1; i < contentarr.length; i++) {
        if (contentarr[i] == "" && contentarr[i - 1] == "") {
            contentarr[i] = null;
        }
        else if (contentarr[i] == "" && contentarr[i - 1] == null) {
            contentarr[i] = null;
        }
    }
    // now remove the blank line
    let truecontent = [];
    for (let i = 0; i < contentarr.length; i++) {
        if (contentarr[i] != null) {
            truecontent.push(contentarr[i]);
        }
    }
    contentarr = truecontent;
}
// console.log(contentarr.join('\n'));
//check for -n commands
let checkforn = optionarr.includes('-n');
// app the line counting 
if (checkforn == true) {
    for (let i = 0; i < contentarr.length; i++) {
        contentarr[i] = `${i + 1} ${contentarr[i]}`;
    }
}
//check for -b commands;
let checkforb = optionarr.includes('-b');
//app the opration
if (checkforb == true) {
    let count = 1;
    for (let i = 0; i < contentarr.length; i++) {
        if (contentarr[i] != "") {
            contentarr[i] = `${count} ${contentarr[i]}`;
            count++;
        }
    }
}
// Finally all the operation are done now we have to print the result 

console.log(contentarr.join('\n'));