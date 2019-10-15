import React from 'react'
import ChecklistCard from '../ChecklistCard'
import { shallow } from 'enzyme'

describe('checklist card', () => {
  test('it should render correctly', () => {
    shallow(<ChecklistCard day={{}}/>)
  })
})