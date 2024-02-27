import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import FeaturedRow from '../components/FeaturedRow';
import { client } from '../sanity';


const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useEffect(() => {
        client.fetch(`
            *[_type == "featured"] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }
        `).then(data => {
            setFeaturedCategories(data)
        })
    },[])

    //react native tem um header default que usando este hook retiramos para criar a nossa
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Image 
                source={{
                    url: "https://links.papareact.com/wru"
                }}
                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <View className="flex-1">
                <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                <Text className="font-bold text-xl">Current Location
                <ChevronDownIcon size={20} color="#00CCBB"/>
                </Text>
            </View>

            <UserIcon size={30} color="#00CCBB" />
        </View>

        {/* Search */}
        
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-row flex-1 bg-gray-200 p-3 space-x-2 rounded-full">
                <MagnifyingGlassIcon color="gray" size={20}/>
                <TextInput placeholder='Restaurants and cuisines' keyboardType='default'/>
            </View>
            <AdjustmentsVerticalIcon color="#00CCBB"/>
        </View>

        {/* Body */}

        <ScrollView
            className="bg-gray-100"
            contentContainerStyle={{
                paddingBottom: 100,
            }}
        >
            {/* Categories */}
            <Categories />

            {featuredCategories?.map(category => (
                <FeaturedRow 
                    key={category._id}
                    id={category._id}
                    title={category.name}
                    description={category.short_description} 
                />
            ))}

        </ScrollView>


    </SafeAreaView>
  )
}

export default HomeScreen