const fs = require('fs')
const path = require('path')

async function listDir() {
    try {
        const files = await fs.promises.readdir(path.join(__dirname, 'secret-folder'))

        for (const file of files){

            fs.stat(path.join(__dirname, 'secret-folder', file), (error, stats) => {
                if(stats.isFile()){
                    if (error) {
                    console.log(error);
                    }
                    else {
                        console.log( `${path.parse(file).name}-${path.parse(file).ext}-${stats.size}b`.replace('.', ''))
                    }
                }
            });
        }
    } catch (err) {
      console.error('Error occurred while reading directory!', err);
    }
  }

  listDir()
