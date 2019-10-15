import React from 'react'
import App from './App'
import { shallow } from 'enzyme'

describe('app', () => {
  test('it should render correctly', () => {
    shallow(<App />)
  })
})