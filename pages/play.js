import TypingGame from 'components/TypingGame'
import { texts } from 'data/english'

export default () => (
  <div>
    <h1>Let’s play!</h1>
    <TypingGame text={texts[1].text} />
  </div>
)
