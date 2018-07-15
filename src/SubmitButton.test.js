import React from "react"
import { shallow } from "enzyme"

import SubmitButton from "./SubmitButton"

describe(SubmitButton.DisplayName, () => {
  it("Has a single button", () => {
    const mount = shallow(<SubmitButton />)
    expect(mount.find("Button")).toHaveLength(1)
  })

  it("is enabled by default", () => {
    const mount = shallow(<SubmitButton />)
    expect(mount.find("Button").prop("disabled")).toEqual(false)
  })

  it("can be disabled", () => {
    const mount = shallow(<SubmitButton isSubmitting={true} />)
    expect(mount.find("Button").prop("disabled")).toEqual(true)
  })
})
