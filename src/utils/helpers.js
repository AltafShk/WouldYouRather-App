export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-GB')
    return time + ' | ' + d.toLocaleDateString()
  }