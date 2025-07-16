import TypeChecker from "@lihzsky/type-checker"

export const Figure = {
  toYuan(value, digit = 2) {
    if (Number.isFinite(+value)) {
      return (value / 100).toFixed(digit)
    }

    return '0.00'
  },

  toFen(value) {
    if (Number.isFinite(value) || (TypeChecker.isString(value) && /^\d+(?:\.\d+)?$/.test(value))) {
      return Number(value) * 100
    }

    return 0
  },

  toPercent(value) {
    if (Number.isFinite(value)) {
      return (value / 100) + '%'
    }

    return ''
  }
}