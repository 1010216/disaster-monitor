export default function estimateMagnitude(a, d) {
  return Math.log10(a) + Math.log10(d) + 1.0
}
