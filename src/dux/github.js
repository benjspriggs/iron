import octokit from '@octokit/rest'

export const REPO_GET_CONTENT = 'REPO_GET_CONTENT'

export const getContentEpic = action$ =>
  action$
    .ofType(REPO_GET_CONTENT)
    .mergeMap(action => {
      const content = octokit.repos.getContent({
        owner: 'benjspriggs',
        repo: 'iron',
        path: ''
      })
      return {
        type: 'THING'
        payload: content,
      }
    })
