import React from 'react'
import ChecklistTableRow from '../ChecklistTableRow'
import { shallow } from 'enzyme'

describe('checklist table row', () => {
  test('it should render correctly', () => {
    const data = {
      data: []
    }
    shallow(<ChecklistTableRow data={data}/>)
  })
})