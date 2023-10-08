// Resize.js

const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid')
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer, thisfilename) {
    const filename = thisfilename;
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, { // size image 300x300
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
