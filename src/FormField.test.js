import React from 'react'
import { render } from 'enzyme'
import { fakeProps } from './testUtil'

import FormField from './FormField'

describe(FormField.DisplayName, () => {
  it('renders without crashing', () => {
    render(<FormField {...fakeProps(FormField)} />)
  })

  it('renders the proper label', () => {
    const p = fakeProps(FormField)
    const mount = render(<FormField {...p} />)

    expect(mount.text()).toEqual(expect.stringContaining(p.label))
  })
})
