import React, { PureComponent } from 'react'
import style from './Select.less'

export default class Select extends PureComponent {
  render() {
    return (
      <div className={this.props.className}>
        <select className={style.select} onChange={this.handleSelect}>
          {
            this.props.options.map((option, id) => {

              let { hidden } = option
              let style

              if (hidden) style = { display: 'none' }
              else style = {}

              return (
                <option
                  key={id}
                  value={option.value}
                  data-text={option.text}
                  selected={option.value === this.props.selected}
                  style={style}
                >
                  {option.text}
                </option>
              )
            }
            )}
        </select>
      </div>
    )
  }

  handleSelect = (e) => {
    let selectedIndex = e.target.selectedIndex
    let text = e.target.options[selectedIndex].dataset.text
    let selectedObject = {
      text: text,
      value: e.target.value
    }
    this.props.onSelect(selectedObject)
  }
}
