import PropTypes from 'prop-types'
import React from 'react'
import TypingGame from './TypingGame'
import styled from 'react-emotion'

const GameContainer = styled.div`
  max-width: 700px;
  margin: 1em auto;
`
export default class Game extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.text !== this.props.text) {
      throw new Error(
        'Error! This component does not support receiving new text. Please unmount this component and mount a new component (using `key={text}`)'
      )
    }
  }
  render () {
    const { text } = this.props
    return (
      <GameContainer>
        <TypingGame text={text} />
      </GameContainer>
    )
  }
}
