import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {count: 25, secondsCompt: 0, isStart: false, timerId: null}
  }

  onDecrease = () => {
    this.setState(old => ({count: old.count - 1}))
  }

  onIncrease = () => {
    this.setState(old => ({count: old.count + 1}))
  }

  updateSec = () => {
    const {count, secondsCompt, timerId} = this.state
    const isCompt = secondsCompt === count * 60

    if (isCompt) {
      clearInterval(timerId)
      this.setState({secondsCompt: 0, count: 25, isStart: false})
    } else {
      this.setState(old => ({secondsCompt: old.secondsCompt + 1}))
    }
  }

  startTimer = () => {
    this.setState(old => ({isStart: !old.isStart}))

    const timerId = setInterval(this.updateSec, 1000)
    this.setState({timerId})
  }

  stopTimer = () => {
    const {timerId} = this.state
    this.setState(old => ({isStart: !old.isStart}))
    clearInterval(timerId)
  }

  resetTimer = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({count: 25, secondsCompt: 0, isStart: false, timerId: null})
  }

  render() {
    const {count, isStart, secondsCompt} = this.state

    const imageUrl = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altValue = isStart ? 'pause icon' : 'play icon'
    const controlText = isStart ? 'Pause' : 'Start'
    const totalSeconds = count * 60 - secondsCompt
    const minutes = parseInt(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const getSecondsFormat = seconds > 9 ? `${seconds}` : `0${seconds}`
    const getMinutesFormat = minutes > 9 ? minutes : `0${minutes}`
    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="timer">
          <div className="timeImg">
            <div className="time">
              <h1>
                {getMinutesFormat}:{getSecondsFormat}
              </h1>
              <p>{isStart ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controllers">
            <div className="btnSec">
              <button
                type="button"
                onClick={isStart ? this.stopTimer : this.startTimer}
              >
                <img src={imageUrl} alt={altValue} className="controlImg" />
                <p>{controlText}</p>
              </button>

              <button type="button" onClick={this.resetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="controlImg"
                />
                <p>reset</p>
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="setTime">
              <button
                type="button"
                onClick={isStart === false ? this.onDecrease : null}
              >
                -
              </button>
              <p className="minutes">{count}</p>
              <button
                type="button"
                onClick={isStart === false ? this.onIncrease : null}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
