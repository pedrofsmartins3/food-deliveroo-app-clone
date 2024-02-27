import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCards from './RestaurantCards'
import { client } from '../sanity';

const FeaturedRow = ({ id, title, description }) => {

  const [restaurants, setRestaurants] = useState([])


 useEffect(() => {
        client.fetch(
          `
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type-> {
                      name
                    }
                },
            }[0]
        `,
        { id }
        ).then(data => {
          setRestaurants(data?.restaurants)
        })
    },[id])

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards */}
        {restaurants?.map((restaurant) => (
            <RestaurantCards 
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating} 
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
        ))}

        
      </ScrollView>
    </View>
  )
}

export default FeaturedRow

{/* 

{"_createdAt": "2024-02-25T16:21:14Z", "_id": "abc589f6-b1bc-4ad0-9e99-b6b7316ecdab", "_rev": "AhQsd13Ciq0lSu1Flnk7cI", "_type": "featured", "_updatedAt": "2024-02-25T16:21:14Z", "name": "Near you...", "restaurants": [{"_createdAt": "2024-02-25T15:43:17Z", "_id": "8f1adca9-e723-46cd-92fe-915ac06ac38a", "_rev": "AhQsd13Ciq0lSu1FlnjlgK", "_type": "restaurants", "_updatedAt": "2024-02-25T16:11:49Z", "adress": "Av. de Ramos Pinto 710, Vila Nova de Gaia", "dishes": [Array], "image": [Object], "lat": 41.137610401147086, "long": -8619098064409376, "name": "Temple D'ouro", "rating": 4.5, "short_description": "Awesome Sushi.", "type": [Object]}, {"_createdAt": "2024-02-25T16:10:42Z", "_id": "3ba3d566-d498-450d-968f-1cb224d7016f", "_rev": "AhQsd13Ciq0lSu1FlnjiG8", "_type": "restaurants", "_updatedAt": "2024-02-25T16:10:42Z", "adress": "São Pedro da Afurada, Vila Nova de Gaia", "dishes": [Array], "image": [Object], "lat": 41.142901956307966, "long": -8635841391038657, "name": "Talho Burguer", "rating": 4.6, "short_description": "Best Hamgúrguer here!", "type": [Object]}], "short_description": "Restaurants in Gaia"}

*/}