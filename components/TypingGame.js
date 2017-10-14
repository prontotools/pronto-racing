import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'

const TypingGameContainer = styled.div`font-size: 24px;`

const GameText = styled.div`
  line-height: 1.5;
  & .past {
    color: #888;
  }
  & .present {
    color: ${props => (props.ok ? '#4a3' : '#f00')};
    background: ${props => (props.ok ? 'transparent' : '#fcc')};
    text-decoration: underline;
  }
  & .future {
    color: #333;
  }
`

const InputArea = styled.div`
  margin-top: 1em;
  & label {
    color: #888;
    font-size: 18px;
  }
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  font-size: 1.5em;
  background: ${props => (props.ok ? 'white' : '#faa')};
  color: ${props => (props.ok ? '#333' : '#f00')};
`

export default class TypingGame extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onProgress: PropTypes.func
  }
  state = { charactersCommitted: 0, inputText: '' }
  componentWillReceiveProps (nextProps) {
    if (nextProps.text !== this.props.text) {
      throw new Error(
        'Error! This component does not support receiving new text. Please unmount this component and mount a new component (using `key={text}`)'
      )
    }
  }
  onChange = e => {
    const { text } = this.props
    const { charactersCommitted } = this.state
    const nextInputText = e.target.value
    if (
      nextInputText === text.substr(charactersCommitted) ||
      (nextInputText.endsWith(' ') &&
        text.substr(charactersCommitted, nextInputText.length) ===
          nextInputText)
    ) {
      const nextCharactersCommitted = charactersCommitted + nextInputText.length
      this.setState({
        inputText: '',
        charactersCommitted: nextCharactersCommitted
      })
      if (this.props.onProgress) {
        this.props.onProgress(charactersCommitted, text.length)
      }
    } else {
      this.setState({ inputText: nextInputText })
    }
  }
  render () {
    const { text } = this.props
    const { charactersCommitted, inputText } = this.state
    const ok = text.substr(charactersCommitted).startsWith(inputText)
    const past = text.substr(0, charactersCommitted)
    const present = (text.substr(charactersCommitted).match(/^\S+/) || [''])[0]
    const future = text.substr(charactersCommitted + present.length)
    const done = charactersCommitted === text.length
    return (
      <TypingGameContainer>
        <GameText ok={ok}>
          <span className='past'>{past}</span>
          <span className='present'>{present}</span>
          <span className='future'>{future}</span>
        </GameText>
        <InputArea>
          <label htmlFor='text'>Type the text:</label>
          <Input
            ok={ok}
            id='text'
            autoFocus
            onChange={this.onChange}
            value={inputText}
            disabled={done}
          />
        </InputArea>
      </TypingGameContainer>
    )
  }
}
