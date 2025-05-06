import { faker } from '@faker-js/faker'
import { Alumno } from '../pages/Alumno'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (num : number): Alumno => {
  return {
    id_alumno: num,
    nombre_alumno: faker.person.firstName(),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Alumno[] => {
    const len = lens[depth]!
    return range(len).map((d): Alumno => {
      return {
        ...newPerson(d),
      }
    })
  }

  return makeDataLevel()
}