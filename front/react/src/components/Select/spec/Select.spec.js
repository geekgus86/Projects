import React from 'react'
import Select from '../Select'
import { shallow } from 'enzyme'

describe('select', () => {
  test('it should render correctly', () => {
    const options = []
    shallow(<Select options={options}/>)
  })
})