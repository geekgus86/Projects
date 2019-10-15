import React from 'react'
import ChecklistHeader from '../ChecklistHeader'
import { shallow } from 'enzyme'

describe('checklist header', () => {
  test('it should render correctly', () => {
    const options = [
      {
        name: 'Test'
      }
    ]
    shallow(<ChecklistHeader options={options}/>)
  })
})