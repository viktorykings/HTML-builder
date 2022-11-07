const fs = require('fs');
const path = require('path')
const process = require('process');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, "project-dist","bundle.css"));

fs.readdir(path.join(__dirname, 'styles'), (err, styles) => {
    if (err)
      console.log(err);
    else {
        styles.forEach(file => {
            fs.stat(path.join(__dirname, 'styles', file), (error, stats) => {
                if(stats.isFile() && path.parse(file).ext === '.css'){
                    if (error) {
                    console.log(error);
                    }
                    else {
                        fs.readFile(path.join(__dirname, 'styles', file), 'utf8', function(err, data){
                            if(err){
                                console.log(err);
                            } else {
                                const input = fs.createReadStream(path.join(__dirname, 'styles', file));

                                input.pipe(output)
                            }

                        });
                        console.log('succes');
                    }
                }
            });
        })
      console.log('Complited');
    }
})

