class PWaveDetector {
  constructor(staWindow = 5, ltaWindow = 50, threshold = 3.0) {
    this.staWindow = staWindow
    this.ltaWindow = ltaWindow
    this.threshold = threshold
    this.buffer = []
  }

  addSample(sample) {
    this.buffer.push(Math.abs(sample))
    if (this.buffer.length > this.ltaWindow) {
      this.buffer.shift()
    }
  }

  isPWaveDetected() {
    if (this.buffer.length < this.ltaWindow) return false
    const sta = average(this.buffer.slice(-this.staWindow))
    const lta = average(this.buffer)
    return sta / lta >= this.threshold
  }
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

module.exports = PWaveDetector
