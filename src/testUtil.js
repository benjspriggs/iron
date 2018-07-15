import generateProps from 'react-generate-props'
import lorem from 'lorem-ipsum'

export const fakeProps = (p, opts) => generateProps(p, {
	generators: {
		string: () => lorem()
	},
	...opts,
})

