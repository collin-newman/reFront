import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'
import { LocationType, ResultsType } from './types'

function Map() {
  const [csv, setCsv] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
        setCsv(csvToJson(results.data))
        setLoading(false)
      },
    })
  }, [])

  return !loading ? (
    <div className="Map">
      <MapContainer
        style={{ height: '100vh' }}
        center={[30.3624756, -81.5580787]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {csv.map((property: LocationType, index: number) => {
          if (property.lat && property.long) {
            return (
              <Marker
                position={[property.lat, property.long]}
                key={
                  String(property.lat) + String(property.long) + String(index)
                }
              >
                <Popup>
                  <p>{property.street}</p>
                  <Link
                    target={'_blank'}
                    to={
                      '/details/' +
                      [property.street.replaceAll(/\s/g, '-')].join('')
                    }
                  >
                    View Info
                  </Link>
                </Popup>
              </Marker>
            )
          }
        })}
      </MapContainer>
    </div>
  ) : (
    <p>loading...</p>
  )
}

export default Map
