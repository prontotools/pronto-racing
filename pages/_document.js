import Document, { Head, Main, NextScript } from 'next/document'
import { flush, hydrate, injectGlobal } from 'emotion'

import { extractCritical } from 'emotion-server'
import stylesheet from 'styles/index.css'

const dev = process.env.NODE_ENV !== 'production'

// Adds server generated styles to emotion cache.
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    if (dev) {
      flush()
    }
    injectGlobal`
      html, body {
        color: #333;
        font-size: 16px;
      }
    `
    const page = renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render () {
    return (
      <html>
        <Head>
          <title>Pronto Racing</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
