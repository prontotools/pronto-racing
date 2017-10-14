import Game from 'components/Game'
import { texts } from 'data/english'

export default () => (
  <div>
    <h1>Let’s play!</h1>
    <Game text={texts[1].text} />
  </div>
)
