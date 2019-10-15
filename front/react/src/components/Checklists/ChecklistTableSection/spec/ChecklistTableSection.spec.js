import React from 'react'
import ChecklistTableSection from '../ChecklistTableSection'
import { shallow } from 'enzyme'

describe('checklist table section', () => {
  test('it should render correctly', () => {
    const data = {}
    shallow(<ChecklistTableSection data={data}/>)
  })
})