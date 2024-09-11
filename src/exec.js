import { sort } from "./main.js"

const input = process.argv.slice(2);
console.log(`INPUT: width ${input[0]}, height ${input[1]}, length ${input[2]}, mass ${input[3]}`)
console.log(`RESULT: ${sort(...input)}`);