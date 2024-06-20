export function getCurrentDay(value) {
  const dayOptions = [
    { value: 'SEGUNDA', number: 1 },
    { value: 'TERÇA', number: 2 },
    { value: 'QUARTA', number: 3 },
    { value: 'QUINTA', number: 4 },
    { value: 'SEXTA', number: 5 },
    { value: 'SÁBADO', number: 6 },
    { value: 'DOMINGO', number: 0 }
  ]

  const dayOfWeek = dayOptions.find((item) => item.number === value)
  return dayOfWeek.value
}
