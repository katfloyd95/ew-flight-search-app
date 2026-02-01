export function formatDuration(departureTime: string, arrivalTime: string): string {
  // Split the times and convert to numbers, defaulting to 0 if missing
  const [depH = 0, depM = 0] = departureTime.split(':').map(part => Number(part))
  const [arrH = 0, arrM = 0] = arrivalTime.split(':').map(part => Number(part))

  // Calculate duration in minutes
  let durationMinutes = (arrH * 60 + arrM) - (depH * 60 + depM)

  // Handle overnight flights (arrival next day)
  if (durationMinutes < 0) durationMinutes += 24 * 60

  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  return `${hours}h ${minutes}m`
}
