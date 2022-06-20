export type ResultsType = {
  data: string[][]
}

export interface LocationType extends Record<string, any> {
  street: string
  city: string
  state: string
  zipcode: string
  neighborhood: string
  lat: number
  long: number
  propertyType: string
}