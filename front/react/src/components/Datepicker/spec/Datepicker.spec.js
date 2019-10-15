import React from 'react'
import Datepicker from '../Datepicker'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import moment from 'moment'

describe('datepicker', () => {
  test('it should render correctly', () => {
    shallow(<Datepicker />)
  })

  test('it should render with today\'s date', () => {
    expect(mount(<Datepicker />).state('now')).toBe(moment().format('YYYY-MM-DD'))
  })

  test('it should render the passed date', () => {
    const date = moment('2017-04-12').format('YYYY-MM-DD')
    expect(mount(<Datepicker date={date}/>).state('now')).toBe(date)
  })

  // test('it should call change event when date is selected', () => {
  //   const onChange = sinon.spy()
  //   const wrapper = mount(<Datepicker onChange={onChange}/>)
  //   wrapper.find('input').value = moment().format('YYYY-MM-DD')
  //   expect(onChange).toHaveProperty('callCount', 1)
  // })
})