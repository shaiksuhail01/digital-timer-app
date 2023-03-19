import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    startOrPauseButton: false,
    limitValue: 25,
    timeRunning: false,
    secondsEl: 0,
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  onClickStartOrPauseButton = () => {
    const {secondsEl, limitValue, timeRunning} = this.state
    this.setState(prevState => ({
      startOrPauseButton: !prevState.startOrPauseButton,
    }))
    const isTimerCompleted = secondsEl === limitValue * 60
    if (isTimerCompleted) {
      this.setState({secondsEl: 0})
      this.setState({timeRunning: false})
    }
    if (timeRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeSeconds, 1000)
    }
    this.setState(prevState => ({timeRunning: !prevState.timeRunning}))
  }

  incrementTimeSeconds = () => {
    const {limitValue, secondsEl} = this.state
    const isTimerCompleted = secondsEl === limitValue * 60
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({timeRunning: false})
    } else {
      this.setState(prevState => ({secondsEl: prevState.secondsEl + 1}))
    }
  }

  onClickDecrementButton = () => {
    const {limitValue} = this.state
    if (limitValue > 1) {
      this.setState(prevState => ({limitValue: prevState.limitValue - 1}))
    }
  }

  onClickIncrementButton = () => {
    this.setState(prevState => ({limitValue: prevState.limitValue + 1}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {limitValue, secondsEl} = this.state
    const totalRemainingSeconds = limitValue * 60 - secondsEl
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onClickResetButton = () => {
    this.clearTimeInterval()
    this.setState({
      startOrPauseButton: false,
      limitValue: 25,
      timeRunning: false,
      secondsEl: 0,
    })
  }

  render() {
    const {startOrPauseButton, limitValue, secondsEl} = this.state

    const startOrPauseIcon = startOrPauseButton
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseText = startOrPauseButton ? 'Pause' : 'Start'
    const startOrPauseAlt = startOrPauseButton ? 'pause icon' : 'play icon'
    const runningOrPausedText = startOrPauseButton ? 'Running' : 'Paused'
    const isButtonDisable = secondsEl > 0

    return (
      <div className="divContainer">
        <h1 className="heading">Digital Timer</h1>
        <div className="mainContainer">
          <div className="timerContainer">
            <div className="boxContainer">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="desc">{runningOrPausedText}</p>
            </div>
          </div>
          <div className="timerLimitContainer">
            <div className="buttonsContainer">
              <div className="startOrPauseButtonContainer">
                <button
                  type="button"
                  className="startOrPauseButtons"
                  onClick={this.onClickStartOrPauseButton}
                >
                  <img
                    src={startOrPauseIcon}
                    alt={startOrPauseAlt}
                    className="startOrPauseImage"
                  />
                  <span className="startOrPauseHeading ">
                    {startOrPauseText}
                  </span>
                </button>
              </div>
              <div className="startOrPauseButtonContainer">
                <button
                  type="button"
                  className="startOrPauseButtons"
                  onClick={this.onClickResetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="startOrPauseImage"
                  />
                  <span className="startOrPauseHeading">Reset</span>
                </button>
              </div>
            </div>
            <p className="desc">Set Timer limit</p>
            <div className="incrementOrDecrementButtonContainer">
              <button
                type="button"
                className="incrementAndDecrementButton"
                onClick={this.onClickDecrementButton}
                disabled={isButtonDisable}
              >
                -
              </button>
              <div className="limitContainer">
                <p className="limitValue">{limitValue}</p>
              </div>
              <button
                type="button"
                className="incrementAndDecrementButton"
                onClick={this.onClickIncrementButton}
                disabled={isButtonDisable}
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
