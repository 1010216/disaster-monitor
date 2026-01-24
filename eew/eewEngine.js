const PWaveDetector = require('./pwaveDetector')
const estimateMagnitude = require('./magnitudeEstimator')

// 建立 P 波偵測器
const detector = new PWaveDetector()

/**
 * 模擬 EEW 核心流程
 * @param {number} sampleAmplitude P 波振幅
 * @param {number} distanceKm 使用者到震央距離 (km)
 * @param {string} originTime 地震起始時間
 * @returns {object|null} EEW 事件
 */
function processWaveSample(sampleAmplitude, distanceKm, originTime) {
  detector.addSample(sampleAmplitude)

  if (detector.isPWaveDetected()) {
    const mag = estimateMagnitude(sampleAmplitude, distanceKm)
    const sWaveArrive = Math.round(distanceKm / 3.5) // S 波速度 3.5 km/s

    if (mag >= 5.5) {
      return {
        type: 'EEW',
        magnitude: mag,
        sWaveArriveIn: sWaveArrive,
        originTime: originTime,
        message: `⚠️ 模擬 EEW：${sWaveArrive} 秒後可能強烈搖晃`
      }
    }
  }

  return null
}

module.exports = processWaveSample
