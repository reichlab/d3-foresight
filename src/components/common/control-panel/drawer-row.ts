/**
 * Row class in control panel
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'

class Component {
  constructor () {}
}

class DrawerRow extends Component {
  constructor (public text: string, public color: string) {
    super()
  }
}

// Icons
// Link -> 🔗
// toggles -> ○ ●

// Organizing classes
// Use d3.create and d3.append(() => <some-selection>)
// In the control panel there are some general row components
// Each row component has a left icon and is hoverable
// Some are togglable and have links too
// The basic RowComponent will have a text and a color
//
// Decorators
// - Hoverable : Needs tooltip title and text
// - Togglable : Will set cursor to pointer and allow active setter
// - Disablable : Will allow disabled setter
// - ExternLink : Needs a link and adds it to the end
