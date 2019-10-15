import React from 'react'
import ChecklistTableHeader from '../ChecklistTableHeader'
import { shallow } from 'enzyme'

describe('checklist table header', () => {
  test('it should render correctly', () => {
    const data = {
      date: []
    }
    shallow(<ChecklistTableHeader data={data}/>)
  })
})