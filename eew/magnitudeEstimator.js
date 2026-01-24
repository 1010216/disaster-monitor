/**
 * 規模估算 (模擬完整 EEW)
 * @param {number} amplitude P 波振幅 (mm/s)
 * @param {number} distanceKm 距離震央 (km)
 * @returns {number} 模擬規模
 */
function estimateMagnitude(amplitude, distanceKm) {
  // 經典經驗公式 (PGA 轉芮氏)
  // M = log10(A) + 3*log10(8*Δt) - 2.92   // Δt 可簡化為距離
  const M = Math.log10(amplitude) + 3 * Math.log10(distanceKm) - 2.92
  return parseFloat(M.toFixed(1))
}

module.exports = estimateMagnitude
