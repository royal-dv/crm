const acronymString = (string: string | ''): string | '' => {
  return string
    ?.toUpperCase()
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '')
}

export { acronymString }
