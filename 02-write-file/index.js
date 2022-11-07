const process = require('process');
const readline = require('readline');
const { stdin, stdout } = process;
const fs = require('fs')
const path = require('path')
const output = fs.createWriteStream(path.join(__dirname,  'text.txt'));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


stdout.write('Введите текст\n');
stdin.on('data', data => {output.write(data)});

rl.on('SIGINT', ()=>{
    process.exit(0)
})
rl.on('line', (input)=> {
    if(input === 'exit'){
        rl.emit('SIGINT')
    }
})
process.on('exit', () => {
    stdout.write('Завершено успешно');
});
