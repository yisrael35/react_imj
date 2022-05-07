const invalid_email_characters = (email) => {
  if (!/^[a-zA-Z0-9@._-]+$/.test(email) && email.trim() !== '') {
    return true
  }
  return false
}

const validateEmail = (email) => {
  if (!email) {
    return false
  }
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

const invalid_phone = (phone) => {
  if (!/^[0-9]+$/.test(phone) && phone.trim() !== '') {
    return true
  }
  return false
}

const all_fields_filled = (fields) => {
  let arrayConstructor = [].constructor
  let objectConstructor = {}.constructor

  if (fields.constructor === arrayConstructor) {
    const len = fields.length
    for (let i = 0; i < len; i++) {
      if (!fields[i] || fields[i].trim() === '') {
        return false
      }
    }
  } else if (fields.constructor === objectConstructor) {
    for (let key in fields) {
      if (fields[key] && fields[key].constructor === objectConstructor) {
        for (let sub_key in fields[key]) {
          if (!fields[key][sub_key] || fields[key][sub_key].trim() === '') {
            return false
          }
        }
      } else if (!fields[key] || fields[key].trim() === '') {
        return false
      }
    }
  }
  return true
}

module.exports = {
  invalid_email_characters,
  invalid_phone,
  all_fields_filled,
  validateEmail,
}
