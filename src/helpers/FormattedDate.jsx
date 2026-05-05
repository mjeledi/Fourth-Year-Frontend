import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function FormattedDate({ dateString, relative = true }) {
  const date = dayjs(dateString)

  if (relative) {
    return <span>{date.fromNow()}</span>
  }

  // * fallback: formatted date like "14th Nov, 2025"

  const day = date.date()
  const getSuffix = (d) => {
    if (d > 3 && d < 21) return "th"
    switch (d % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }
  const suffix = getSuffix(day)
  const month = date.format("MMM")
  const year = date.year()

  return (
    <span>
      {day}<sup style={{ fontSize: "0.6em" }}>{suffix}</sup> {month}, {year}
    </span>
  )
}

FormattedDate.propTypes = {
  dateString: PropTypes.string.isRequired,
  relative: PropTypes.bool, // * true = "1 hr ago", false = formatted date
}
