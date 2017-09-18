import Link from 'next/link'
import { hydrate, injectGlobal } from 'emotion'

import Test from 'components/Test'

// Adds server generated styles to emotion cache.
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const Root = () =>
  <div>
    <h1>Pronto Racing</h1>
    <Link href='/play'>
      <button>Start racing</button>
    </Link>
    <Test />
  </div>

injectGlobal`
  html, body {
    color: #333;
    font-size: 16px;
  }
`

export default Root
