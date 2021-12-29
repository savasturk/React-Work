import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
    const statusChance = 5
    return {
      id: 1,
      kontrat:"aaa",
      teklif:100 ,
      data: 
        statusChance > 0.66
          ? 'Alış'
          : statusChance > 0.33
          ? 'Satış'
          : 'Satış',
    }
  }

  export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return range(len).map(d => {
        return {
          ...newPerson(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
      })
    }
  
    return makeDataLevel()
  }