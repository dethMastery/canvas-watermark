const fs = require('fs')
const sharp = require('sharp')

const lists = require('./ignored.json').ignored

function mark(folderPath, config) {
  // const redBan = '\x1b[31m%s\x1b[0m'

  const pattern = /\.(jpg|png|jpeg)$/

  function canvasFooter(imgPath) {}

  fs.readdirSync(folderPath).forEach((file) => {
    if (!lists.includes(file)) {
      if (pattern.test(file)) {
        const path = `${folderPath}/${file}`

        sharp(path)
          .metadata()
          .then(function (metadata) {
            const imgResolution = [metadata.width, metadata.height]
            console.log('Image width:', imgResolution[0])
            console.log('Image height:', imgResolution[1])
            console.log('');
          })
          .catch(function (error) {
            console.log('Error loading the image:', error)
          })
      }
    }
  })
}

module.exports = mark
