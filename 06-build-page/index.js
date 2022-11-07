const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')
const process = require('process');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, "project-dist", "style.css"));


// create directory
fs.mkdir(path.join(__dirname,   'project-dist'), {recursive: true} , (err) => {
    if (err) {
        return console.error(err);
    }
});

//create new subdirectory and copy files
fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
    if (err)
      console.log(err);
    else {
        fs.mkdir(path.join(__dirname,   'project-dist', 'assets'), {recursive: true} , (err) => {
            if (err) {
                return console.error(err);
            }
        });
      files.forEach(file => {
        fs.stat(path.join(__dirname, 'assets', file), (error, stats) => {
            if(stats.isDirectory()){
                if (error) {
                console.log(error);
                }
                else {
                    fs.mkdir(path.join(__dirname,   'project-dist', 'assets', file), {recursive: true} , (err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                    fs.readdir(path.join(__dirname, 'assets', file), (err, innerFiles) => {
                        if(err){
                            console.log(err);
                        } else{
                            innerFiles.forEach(innerFile => {
                                fsPromises.copyFile(path.join(__dirname, 'assets', file, innerFile), path.join(__dirname, 'project-dist', 'assets', file, innerFile))
                                .catch(function(error) {
                                    console.log(error);
                                });
                            })
                        }
                    })
                }
            } else {
                fsPromises.copyFile(path.join(__dirname, 'assets', file), path.join(__dirname, 'project-dist', 'assets', file))
                .catch(function(error) {
                    console.log(error);
                });
            }
        });
      })
    }
  })


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
                      }
                  }
              });
          })
        console.log('Complited');
      }
  })

// replace template with HTML

fs.readFile(path.join(__dirname,   'template.html'), 'utf8', (error, fileContent) => {
    if(error){
        console.log(error);
    } else {
            fs.readFile(path.join(__dirname,   'components', 'header.html'), 'utf8', (errorHeader, fileContentHeader) => {
               if(errorHeader) throw errorHeader;
               fileContent = fileContent.replace(/\{\{header\}\}/, fileContentHeader);
               fs.writeFile(path.join(__dirname,   'project-dist', 'index.html'), fileContent, err => {
                if(err){
                    console.log(err);
                }
        })
               fs.readFile(path.join(__dirname,   'components', 'articles.html'), 'utf8', (errorFooter, fileContentArticle) => {
                  if(errorFooter) throw errorFooter;

                  fileContent = fileContent.replace(/\{\{articles\}\}/, fileContentArticle);
                  fs.writeFile(path.join(__dirname,   'project-dist', 'index.html'), fileContent, err => {
                        if(err){
                            console.log(err);
                        }
                })

                fs.readFile(path.join(__dirname,   'components', 'footer.html'), 'utf8', (errorFooter, fileContentFooter) => {
                     if(errorFooter) console.log(errorFooter);;

                     fileContent = fileContent.replace(/\{\{footer\}\}/, fileContentFooter);
                     fs.writeFile(path.join(__dirname,   'project-dist', 'index.html'), fileContent, err => {
                        if(err){
                            console.log(err);
                        }
                })
                     // console.log(fileContent);

                     fs.readFile(path.join(__dirname,   'components', 'about.html'), 'utf8', (errorAbout, fileContentAbout) => {
                        if(errorFooter) console.log(errorAbout);;

                        fileContent = fileContent.replace(/\{\{about\}\}/, fileContentAbout);
                         fs.writeFile(path.join(__dirname,   'project-dist', 'index.html'), fileContent, err => {
                             if(err){
                                 console.log(err);
                             }
                     })
                     })
                    })

                  })
               });

    }
 });

