import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import { LocationType, ResultsType } from './types'
import { useParams } from 'react-router'

const PropertyDetails = () => {
  const [details, setDetails] = useState<LocationType | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  /*
  Rule of 72
  - how long to double in price
  time = 72 / growth rate

  GRM = Market Value / Gross Scheduled Income
  - 8.53

  Gross Scheduled Income = sum of each units's yearly rent (estimate if vacant)

  Vacancy and Credit loss = Gross scheduled income * Vacancy Rate
  - 8.58% average since 2009
  - 7.81% recent rate
  - 6.03 minimum
  - 14.09 maximium

  Gross Operating Income (Effective Gross Income) = Gross Scheduled Income - Vacancy and Credit Loss

  Net Operating Income = Gross Operating Income - Operating Expenses

  Cap Rate = Net Operating Income / Property Value

  Net Income Multiplier = 1 / Cap Rate

  */

  useEffect(() => {
    Papa.parse('http://localhost:3000/redfinRents.csv', {
      download: true,
      complete: (results: ResultsType) => {
        const csvToJson = (csvArr: string[][]) =>
          csvArr.reduce((accJson: LocationType[], curCsvArr: string[]) => {
            const location: LocationType = {
              propertyType: curCsvArr[2],
              street: curCsvArr[3],
              city: curCsvArr[4],
              state: curCsvArr[5],
              zipcode: curCsvArr[6],
              neighborhood: curCsvArr[10],
              lat: Number(curCsvArr[25]),
              long: Number(curCsvArr[26]),
            }
            accJson.push(location)
            return accJson
          }, [])
        setDetails(
          csvToJson(results.data).find(
            (property: LocationType) =>
              property.street.replaceAll(/\s/g, '-') === id
          )
        )
        setLoading(false)
      },
    })
  }, [])

  useEffect(() => console.log(details), [loading])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!details) {
    return <p>No details</p>
  }

  const content = Object.keys(details).map((key) => (
    <p key={key}>
      {key}: {details[key]}
    </p>
  ))

  return content
}

export default PropertyDetails
