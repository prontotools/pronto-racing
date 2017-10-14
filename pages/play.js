import Game from 'components/Game'
import { texts } from 'data/english'

const text = texts[1]

export default () => (
  <div>
    <h1>Let’s play!</h1>
    <Game text={text.text} sourceName={text.name} sourceUrl={text.url} />
  </div>
)
