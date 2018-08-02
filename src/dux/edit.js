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
