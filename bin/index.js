const fs = require('fs')
const sharp = require('sharp')
const ExifParser = require('exif-parser')

const lists = require('./ignored.json').ignored
const canvasFooter = require('./canvas')

function mark(folderPath, title) {
  // const redBan = '\x1b[31m%s\x1b[0m'

  const pattern = /\.(jpg|png|jpeg)$/i

  fs.readdirSync(folderPath).forEach((file) => {
    if (!lists.includes(file)) {
      if (pattern.test(file)) {
        const path = `${folderPath}/${file}`

        try {
          const data = fs.readFileSync(path)
          const parser = ExifParser.create(data)
          const result = parser.parse()

          let imgResolution

          if (result.tags.Orientation == 8) {
            imgResolution = [result.tags.ExifImageHeight, result.tags.ExifImageWidth]
          } else {
            imgResolution = [result.tags.ExifImageWidth, result.tags.ExifImageHeight]
          }

          const model = [
            result.tags.Model,
            result.tags.LensModel,
            new Date(result.tags.DateTimeOriginal * 1000).toLocaleDateString() +
              ' ' +
              title,
          ]

          canvasFooter(path, imgResolution, model)
        } catch (error) {
          console.log('Error reading or parsing the image file:', error)
        }
      }
    }
  })
}

module.exports = mark
