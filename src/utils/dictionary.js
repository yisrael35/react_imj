import { useSelector } from 'react-redux'
const words_he = require('./languages/he')
const words_en = require('./languages/en')

const dictionaries = { he: words_he, en: words_en }

const Dictionary = () => {
  const language = useSelector((state) => state.auth.language)
  return dictionaries[language]
}
export default Dictionary
