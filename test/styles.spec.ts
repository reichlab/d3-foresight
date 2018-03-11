import * as scssToJson from 'scss-to-json'
import * as fs from 'fs-extra'
import { expect } from 'chai'
import 'mocha'


describe('Color palette', () => {
  it('should be same in json and scss', async () => {
    let jsonPalette = JSON.parse(await fs.readFile('./src/styles/palette.json'))
    let scssPalette = scssToJson('./src/styles/_palette.scss')

    for (let item in scssPalette) {
      if (!item.startsWith('$c') || (item.length !== 3)) {
        expect(jsonPalette[item.slice(1)]).to.equal(scssPalette[item])
      }
    }
  })
})
