import React from 'react'
import Menu from '../Menu'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('menu', () => {
  test('it should render correctly', () => {
    let onRef = sinon.spy()
    shallow(<Menu onRef={onRef} />)
  })
})