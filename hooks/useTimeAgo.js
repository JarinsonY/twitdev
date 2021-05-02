import { useEffect, useState } from "react"
import { formatDate } from "./useDateTimeFormat"

//  Detecta si el navegador es compatible con la funcionalidad
const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["day", 86400], // # de sec en un día
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now() //  Capturo momento exacto
  const elapsed = (timestamp - now) / 1000 // Tiempo que ha pasado

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    //  Si lo soporta ->
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [timestamp])

  //  Si no lo soporta ->
  if (!isRelativeTimeFormatSupported) {
    formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  }) // relative time format

  const { value, unit } = timeago

  return rtf.format(value, unit)
}
