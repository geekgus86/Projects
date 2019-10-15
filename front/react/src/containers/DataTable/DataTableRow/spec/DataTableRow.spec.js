import React from 'react'
import DataTableRow from '../DataTableRow'
import { shallow } from 'enzyme'

describe('data table row', () => {
  test('it should render correctly', () => {
    shallow(<DataTableRow row={[]} />)
  })
})