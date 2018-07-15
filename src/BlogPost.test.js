import React from "react"
import { render } from "enzyme"

import BlogPost from "./BlogPost"
import { fakeProps } from "./testUtil"

describe(BlogPost.DisplayName, () => {
  it("renders the header", () => {
    const p = fakeProps(BlogPost)

    const mount = render(<BlogPost {...p} />)

    expect(mount.text()).toEqual(expect.stringContaining(p.title))
    expect(mount.text()).toEqual(expect.stringContaining(p.source))
  })

  it("renders the content", () => {
    const p = fakeProps(BlogPost, { optional: true })

    const mount = render(<BlogPost {...p} />)

    expect(mount.text()).toEqual(expect.stringContaining(p.content))
  })
})
