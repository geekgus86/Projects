import React from 'react'
import ChecklistTableCell from '../ChecklistTableCell'
import { shallow } from 'enzyme'

describe('checklist table cell', () => {
  test('it should render correctly', () => {
    shallow(<ChecklistTableCell data={{}}/>)
  })
})