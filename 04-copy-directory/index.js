const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')


fs.mkdir(path.join(__dirname,   'files-copy'), {recursive: true} , (err) => {
    if (err) {
        return console.error(err);
    }
});


getCurrentFilenames()
function getCurrentFilenames() {
  fs.readdir(path.join(__dirname, 'files-copy'), (err, filesToDelete) =>{
    filesToDelete.forEach(fileDel => {
      fsPromises.unlink(path.join(__dirname, 'files-copy', fileDel), err => {
        if (err) console.log(err);
        })
    })
  })

    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        if (err)
          console.log(err);
        else {
          
          files.forEach(file => {
            // console.log(file);
            fsPromises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file))
              .catch(function(error) {
                console.log(error);
              });
          })
          console.log('Complited');
        }
      })
  }
