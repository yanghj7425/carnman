import { Message } from 'element-ui'

function showInfo(message, duration) {
  show(message, duration * 1000, 'info')
}

function showWarning(message, duration) {
  show(message, duration * 1000, 'warning')
}

function showSuccess(message, duration) {
  show(message, duration * 1000, 'success')
}

function show(message, duration, type) {
  Message({
    message: message,
    type: type,
    duration: duration
  })
}

const Msg = {
  showInfo,
  showWarning,
  showSuccess
}

export default Msg
