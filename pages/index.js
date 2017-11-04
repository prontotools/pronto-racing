import Test from 'components/Test'

import Link from '../components/Link'

const Root = () => (
  <div>
    <h1>Pronto Racing</h1>
    <Link href='/play'>
      <button>Start racing</button>
    </Link>
    <Test />
  </div>
)

export default Root
