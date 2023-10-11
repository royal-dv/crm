const getFirstSymbol = (string: string): string | '' => {
  if (string === '') return ''
  return string?.slice(0, 1)
}

const getUnionFirstSymbols = (name: string, surname: string): string | '' => {
  if (name === '' && surname === '') return ''
  return name.concat(surname)
}

const getUnionName = (name: string, surname: string): string | '' => {
  if (name === '' && surname === '') return ''
  return name.concat(' ', surname)
}

export { getFirstSymbol, getUnionFirstSymbols, getUnionName }
