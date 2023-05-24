const fs = require('fs')
const sharp = require('sharp')
const ExifParser = require('exif-parser')

const lists = require('./ignored.json').ignored

function mark(folderPath, config, title) {
  // const redBan = '\x1b[31m%s\x1b[0m'

  const pattern = /\.(jpg|png|jpeg)$/i

  function canvasFooter(imgPath) {}

  fs.readdirSync(folderPath).forEach((file) => {
    if (!lists.includes(file)) {
      if (pattern.test(file)) {
        const path = `${folderPath}/${file}`

        sharp(path)
          .metadata()
          .then(function (metadata) {
            const imgResolution = [metadata.width, metadata.height]

            try {
              const data = fs.readFileSync(path)
              const parser = ExifParser.create(data)
              const result = parser.parse()
              const model = [result.tags.Model, result.tags.LensModel, new Date(result.tags.DateTimeOriginal * 1000).toLocaleDateString() + ' ' + title]

              console.log(imgResolution);
              console.log(model);
              console.log('');
            } catch (error) {
              console.log('Error reading or parsing the image file:', error)
            }
          })
          .catch(function (error) {
            console.log('Error loading the image:', error)
          })
      }
    }
  })
}

module.exports = mark