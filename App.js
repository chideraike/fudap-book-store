import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, SafeAreaView, StyleSheet, Image } from 'react-native'

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

  const BookItem = ({ item }) => (
    <View style={styles.bookItemContainer}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.bookItemImage}
      />
      <View>
        <Text>{item.title}</Text>
        <Text>{item.subtitle}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  )

  if (isLoading) return (
    <ActivityIndicator
      size="large"
      color="#0000ff"
      testID="loading"
      accessibilityLabel="App is loading books"
      style={{ flex: 1 }}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={BookItem}
        keyExtractor={item => item.id.toString()}
        accessibilityLabel="books"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookItemContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  bookItemImage: {
    height: 150,
    width: 100,
  },
})