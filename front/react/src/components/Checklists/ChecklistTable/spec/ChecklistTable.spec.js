import React from 'react'
import ChecklistTable from '../ChecklistTable'
import { shallow } from 'enzyme'

describe('checklist table', () => {
  test('it should render correctly', () => {
    shallow(<ChecklistTable data={{}}/>)
  })
})