import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, SafeAreaView } from 'react-native'

export default function App() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://fudap-books-api.herokuapp.com/books/')
      .then(response => {
        if (response.ok) return response.json()
        throw response
      })
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        Fudap Book Store
      </Text>
    </SafeAreaView>
  )
}

