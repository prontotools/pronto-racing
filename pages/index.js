import Link from 'next/link'
import Test from 'components/Test'

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
