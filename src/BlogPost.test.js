/**
 * MIT License
 *
 * Copyright (c) 2018 Benjamin Spriggs
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
    const content = p.content ? p.content.join("") : ""

    expect(mount.text()).toEqual(expect.stringContaining(content))
  })
})
