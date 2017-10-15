import PropTypes from 'prop-types'
import React from 'react'
import TypingGame from './TypingGame'
import styled from 'react-emotion'

const GameContainer = styled.div`
  max-width: 700px;
  margin: 1em auto;
`
const Status = styled.div`margin-top: 1em;`
export default class Game extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    sourceName: PropTypes.string,
    sourceUrl: PropTypes.string
  }
  state = {
    wpm: null,
    progress: 0
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.text !== this.props.text) {
      throw new Error(
        'Error! This component does not support receiving new text. Please unmount this component and mount a new component (using `key={text}`)'
      )
    }
  }
  onType = () => {
    if (!this.started) this.started = Date.now()
  }
  onProgress = (current, total) => {
    this.setState({
      progress: current / total,
      wpm: current / 5 / ((Date.now() - this.started) / 60000)
    })
  }
  render () {
    const { text, sourceName, sourceUrl } = this.props
    const { progress, wpm } = this.state
    return (
      <GameContainer>
        <TypingGame
          text={text}
          sourceName={sourceName}
          sourceUrl={sourceUrl}
          onProgress={this.onProgress}
          onType={this.onType}
        />
        <Status>
          {(progress * 100).toFixed(0)}% completed{wpm ? `, ${wpm.toFixed(0)} WPM` : ''}
        </Status>
      </GameContainer>
    )
  }
}
