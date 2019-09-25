/*
import { shallow } from 'enzyme'
import React from 'react'

Example:

import LogTailer from '../nerdlets/my-nerdlet/index' // Replace this with your nerdlet

let props;

beforeEach( () => {

  // Mock NR1 object with just the properties your nerdlet uses
  const mocknr1 = {
    launcher: {
      state: {
        timeRange:{
          end_time: null,
          begin_time: null,
          duration: 180000
        }
      }
    },
    paneManager: {
      enterFullscreen: jest.fn()
    },
  }

  // Mock props object
  props = {
    nr1: mocknr1,
  }

  // Shallow render your component so you don't render its children
  shallow(<MyNerdlet {...props}/>)
})


// Example test.
test("enters full screen", () => {
  // MyNerdlet should enter full screen as soon as it's rendered
  expect(props.nr1.paneManager.enterFullscreen).toHaveBeenCalled()
})
*/

test('first test!', () => {
  expect(true).toBe(true);
})
