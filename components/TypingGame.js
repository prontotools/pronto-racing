import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'

const GameContainer = styled.div`
  max-width: 32em;
  margin: 1em auto;
  font-size: 24px;
`

const GameText = styled.div`line-height: 1.5;`

const GameInputArea = styled.div`
  margin-top: 1em;
  & input {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 1.5em;
  }
  & label {
    color: #888;
    font-size: 18px;
  }
`

export default class TypingGame extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }
  render () {
    return (
      <GameContainer>
        <GameText>{this.props.text}</GameText>
        <GameInputArea>
          <label htmlFor='text'>Type the text:</label>
          <input id='text' autoFocus />
        </GameInputArea>
      </GameContainer>
    )
  }
}
