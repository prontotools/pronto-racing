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

const Attribution = styled.div`
  margin: 1em 0 3em;
  font-size: 0.5em;
  text-align: right;
  color: grey;

  & a,
  a:visited {
    color: grey;
    text-decoration: none;
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
    sourceName: PropTypes.string,
    sourceUrl: PropTypes.string,
    onProgress: PropTypes.func,
    onType: PropTypes.func
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
    const { onProgress, onType, text } = this.props
    if (onType) {
      onType()
    }

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
      if (onProgress) {
        onProgress(nextCharactersCommitted, text.length)
      }
    } else {
      this.setState({ inputText: nextInputText.replace(/^\s+/, '') })
    }
  }
  render () {
    const { text, sourceName, sourceUrl } = this.props
    const { charactersCommitted, inputText } = this.state
    const ok = text.substr(charactersCommitted).startsWith(inputText)
    const past = text.substr(0, charactersCommitted)
    const present = (text.substr(charactersCommitted).match(/^\S+/) || [''])[0]
    const future = text.substr(charactersCommitted + present.length)
    const done = charactersCommitted === text.length
    const source = sourceUrl ? <a href={sourceUrl}>{sourceName}</a> : sourceName
    return (
      <TypingGameContainer>
        <GameText ok={ok}>
          <span className='past'>{past}</span>
          <span className='present'>{present}</span>
          <span className='future'>{future}</span>
        </GameText>
        <Attribution>Excerpt from {source}</Attribution>
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
