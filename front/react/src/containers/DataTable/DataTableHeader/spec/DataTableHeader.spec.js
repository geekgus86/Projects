import React from 'react'
import DataTableHeader from '../DataTableHeader'
import { shallow } from 'enzyme'

describe('data table header', () => {
  test('it should render correctly', () => {
    shallow(<DataTableHeader headers={[]} />)
  })
})