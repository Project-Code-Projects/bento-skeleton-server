export function getUtilizationLevel (utilization: number) {
  if (utilization <= 50) return 'LU';
  if (utilization > 75) return 'HU';
  return 'MU'
}