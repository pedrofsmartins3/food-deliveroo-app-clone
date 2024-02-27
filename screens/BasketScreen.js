import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';

const BasketScreen = () => {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const feePrice = 5.99

    useMemo(() => { 
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results
        }, {})

        setGroupedItemsInBasket(groupedItems)
    }, [items])
    
  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                <View>
                    <Text className="text-lg font-bold text-center">Basket</Text>
                    <Text className="text-center text-gray-400">
                        {restaurant.title}
                    </Text> 
                </View>
                <TouchableOpacity 
                className="absolute top-3 right-5 bg-gray-100 rounded-full"
                onPress={navigation.goBack}
                >
                    <XCircleIcon size={50} width={50} color="#00CCBB"/>
            </TouchableOpacity>
            </View>

           <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                <Image 
                    source={{
                        url: "https://links.papareact.com/wru"
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <Text className="flex-1">Deliver in 50-75min</Text>
                <TouchableOpacity>
                    <Text className="text-[#00CCBB]">Change</Text>
                </TouchableOpacity>
            </View> 

            <ScrollView className="divide-y divide-gray-200">
                {Object.entries(groupedItemsInBasket).map(([key, items]) => [
                    <View key={key} className="flex-row items-center space-x-3 b-white py-2 px-5">
                        <Text className="text-[#00CCBB]">{items.length} x</Text>
                        <Image 
                            source={{
                                url: urlFor(items[0]?.image).url()
                            }}
                            className="h-12 w-12 rounded-full"
                        />
                       <Text className="flex-1">{items[0]?.name}</Text> 

                       <Text className="text-gray-600">
                            {items[0]?.price} €
                       </Text>

                       <TouchableOpacity 
                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                        >
                            <Text
                                className="text-[#00CCBB] text-xs"
                            >
                                Remove
                            </Text>
                       </TouchableOpacity>
                    </View>
                ])}
            </ScrollView>

            <View className="p-5 vg-white mt-5 space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Subtotal</Text>
                    <Text className="text-gray-400">
                        {basketTotal} €
                    </Text>
                </View>   

                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Delivery Fee</Text>
                    <Text className="text-gray-400">
                        {feePrice} €
                    </Text>
                </View>  

                <View className="flex-row justify-between">
                    <Text>Order Total</Text>
                    <Text className="font-extrabold">
                        {basketTotal + feePrice} €
                    </Text>
                </View>

                <TouchableOpacity 
                    onPress={() => navigation.navigate("PreparingOrder")}
                    className="rounded-lg bg-[#00CCBB] p-4"
                >
                    <Text className="text-center text-white text-bold text-lg">Place Order</Text>
                </TouchableOpacity> 
            </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen