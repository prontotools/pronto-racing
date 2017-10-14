import React from 'react'
import Game from './Game'
import { texts } from '../data/english'

export default class GameManager extends React.Component {
  state = {
    textObj: null
  }
  componentDidMount () {
    // We need to randomize state here because we do not want next.js
    // to pre-render the randomized text as it will be a different
    // random value than what we did here locally.
    // TODO: In the future, fetch the text from FireBase

    // Note: keys are numerically indexed, but it is not guaranteed to be consequtive.
    // If texts are removed, then there will be wholes and so we need to get the
    // object keys and pick a random element rather than just picking a random
    // element from the object.
    const keys = Object.keys(texts)

    this.setState({
      textObj: texts[keys[parseInt(keys.length * Math.random(), 10)]]
    })
  }
  render () {
    const { textObj } = this.state
    if (textObj) {
      return (
        <Game
          text={textObj.text}
          sourceName={textObj.name}
          sourceUrl={textObj.url}
        />
      )
    } else {
      // Next.js will pre-render this because Next.js does not call componentDidMount
      return <p>Game is loading...</p>
    }
  }
}
