const helper = {
  ytRegex: /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{10,12})(?:[&?#].*?)*?(?:[&?#]start|t=(\d+|[\dhm]+s))?$/,
  lihkgRegex: /^(?:https?:\/\/)?lihkg\.com\/(?:t|thread)\/(\d+)/,
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  },
  trackEvent({ eventCategory, eventAction, eventLabel }) {
    if (window.ga) {
      window.ga('send', 'event', eventCategory, eventAction, eventLabel)
    }
  },
  initYoutube() {
    if (!window.YT) {
      const tag = document.createElement('script')
      const firstScriptTag = document.getElementsByTagName('script')[0]
      tag.src = 'https://www.youtube.com/iframe_api'
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }
  },
  elementInViewport(el) {
    let top = el.offsetTop

    while (el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
    }

    return top >= window.pageYOffset
  },
  isOverflown(element) {
    return element.scrollWidth > element.clientWidth
  },
  getRelativeTime(timestamp) {
    const current = Math.floor(Date.now() / 1000)
    const secondPerMinute = 60
    const secondPerHour = secondPerMinute * 60
    const secondPerDay = secondPerHour * 24
    const secondPerMonth = secondPerDay * 30
    const secondPerYear = secondPerDay * 365

    const elapsed = current - timestamp

    if (elapsed < secondPerMinute) {
      return '剛剛'
    } else if (elapsed < secondPerHour) {
      return `${Math.round(elapsed / secondPerMinute)} 分鐘前`
    } else if (elapsed < secondPerDay) {
      return `${Math.round(elapsed / secondPerHour)} 小時前`
    } else if (elapsed < secondPerMonth) {
      return `${Math.round(elapsed / secondPerDay)} 日前`
    } else if (elapsed < secondPerYear) {
      return `${Math.round(elapsed / secondPerMonth)} 個月前`
    }

    return `${Math.round(elapsed / secondPerYear)} 年前`
  },
  getConvertedTime(timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = `0${date.getHours()}`.substr(-2)
    const minutes = `0${date.getMinutes()}`.substr(-2)
    const seconds = `0${date.getSeconds()}`.substr(-2)

    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
  },
  parseDuration(duration) {
    const matches = duration.match(/[0-9]+[hms]/g)
    let seconds = 0

    if (!matches) {
      return duration
    }

    matches.forEach((part) => {
      const unit = part.charAt(part.length - 1)
      const amount = parseInt(part.slice(0, -1), 10)

      switch (unit) {
        case 'h':
          seconds += amount * 60 * 60
          break
        case 'm':
          seconds += amount * 60
          break
        case 's':
          seconds += amount
          break
        default:
        // noop
      }
    })

    return seconds
  },
  uniqBy(originalArray, objKey) {
    const trimmedArray = []
    const values = []
    let value

    for (let i = 0; i < originalArray.length; i += 1) {
      value = originalArray[i][objKey]

      if (values.indexOf(value) === -1) {
        trimmedArray.push(originalArray[i])
        values.push(value)
      }
    }

    return trimmedArray
  },
}

export default helper
