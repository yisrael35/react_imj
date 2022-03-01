const invalid_email = (email) => {
  if (!/^[a-zA-Z0-9]+$/.test(email) && email.trim() !== '') {
    return true
  }
  return false
}
const invalid_phone = (phone) => {
  if (!/^[0-9]+$/.test(phone) && phone.trim() !== '') {
    return true
  }
  return false
}

const all_fields_filled = (fields) => {
  var arrayConstructor = [].constructor
  var objectConstructor = {}.constructor
  
  if (fields.constructor === arrayConstructor) {
    const len = fields.length
    for (let i = 0; i < len; i++) {
      if (fields[i].trim() === '') {
        return false
      }
    }
  } else if (fields.constructor === objectConstructor) {
    for (let key in fields) {
      if (fields[key].trim() === '') {
        return false
      }
    }
  }
  return true
}

module.exports = {
  invalid_email,
  invalid_phone,
  all_fields_filled,
}
