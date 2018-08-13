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
import { createActions, handleActions } from "redux-actions"

export const {
  updateContent,
  updateSource,
  updateTitle,
  updateDate
} = createActions({
  UPDATE_CONTENT: content => ({
    content: typeof content === "string" ? content.split("\n") : content
  }),
  UPDATE_SOURCE: source => ({ source }),
  UPDATE_TITLE: title => ({ title }),
  UPDATE_DATE: date => ({ date })
})

export default handleActions(
  {
    [updateContent]: (state, action) => ({ ...state, ...action.payload }),
    [updateSource]: (state, action) => ({ ...state, ...action.payload }),
    [updateTitle]: (state, action) => ({ ...state, ...action.payload }),
    [updateDate]: (state, action) => ({ ...state, ...action.payload })
  },
  { content: [], source: "", title: "" }
)
