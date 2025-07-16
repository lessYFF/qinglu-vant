export const DocTool = {
  filter(values, filterFields = [], options = {}) {
    const opts = Object.assign({ append: true }, options)
    const defaultFields = ['createTime', 'createUserId', 'opTime', 'opUserId', 'lastVer', 'deleted']
    const fields = (opts.append ? defaultFields : []).concat(filterFields)

    return Object.keys(values).reduce((doc, key) => {
      if (!fields.includes(key)) {
        doc[key] = values[key]
      }

      return doc
    }, {})
  }
}