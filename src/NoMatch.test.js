import React from "react"
import NoMatch from "./NoMatch"
import { render } from "enzyme"

it("displays text", () => {
  const mount = render(<NoMatch />)
  expect(mount.text()).toEqual(expect.anything())
})
