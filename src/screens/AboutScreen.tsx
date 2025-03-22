import { View, Text, ScrollView, Image, Linking, TouchableOpacity } from "react-native"
import { List } from "@ant-design/react-native"
import { Ionicons } from "@expo/vector-icons"
import tw from "twrnc"
import { useStore } from "../store"

const Item = List.Item

const AboutScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode)

  return (
    <ScrollView style={tw`flex-1 bg-${isDarkMode ? "gray-900" : "white"}`}>
      <View style={tw`items-center p-6`}>
        <Image source={require("../../assets/logo.png")} style={tw`w-24 h-24 mb-4`} resizeMode="contain" />
        <Text style={tw`text-2xl font-bold text-${isDarkMode ? "white" : "gray-900"}`}>StudyVerse</Text>
        <Text style={tw`text-base text-${isDarkMode ? "gray-400" : "gray-600"} text-center mt-2 mb-1`}>
          Version 1.0.0
        </Text>
        <Text style={tw`text-sm text-${isDarkMode ? "gray-500" : "gray-500"} text-center mb-6`}>
          Your personalized learning companion
        </Text>

        <Text style={tw`text-base text-${isDarkMode ? "gray-300" : "gray-700"} text-center mb-8 px-4`}>
          StudyVerse is an AI-powered learning platform designed to help students master any subject through
          personalized learning paths, interactive study tools, and a supportive community.
        </Text>
      </View>

      <List style={tw`mb-6`}>
        <Item
          arrow="horizontal"
          style={tw`bg-${isDarkMode ? "gray-800" : "white"}`}
          thumb={<Ionicons name="document-text-outline" size={24} color="#8B5CF6" style={tw`mr-3`} />}
          onPress={() => Linking.openURL("https://example.com/terms")}
        >
          <Text style={tw`text-${isDarkMode ? "white" : "gray-900"} font-medium`}>Terms of Service</Text>
        </Item>
        <Item
          arrow="horizontal"
          style={tw`bg-${isDarkMode ? "gray-800" : "white"}`}
          thumb={<Ionicons name="shield-checkmark-outline" size={24} color="#3B82F6" style={tw`mr-3`} />}
          onPress={() => Linking.openURL("https://example.com/privacy")}
        >
          <Text style={tw`text-${isDarkMode ? "white" : "gray-900"} font-medium`}>Privacy Policy</Text>
        </Item>
        <Item
          arrow="horizontal"
          style={tw`bg-${isDarkMode ? "gray-800" : "white"}`}
          thumb={<Ionicons name="information-circle-outline" size={24} color="#14B8A6" style={tw`mr-3`} />}
          onPress={() => Linking.openURL("https://example.com/licenses")}
        >
          <Text style={tw`text-${isDarkMode ? "white" : "gray-900"} font-medium`}>Licenses</Text>
        </Item>
      </List>

      <Text style={tw`text-lg font-semibold px-6 mb-4 text-${isDarkMode ? "white" : "gray-900"}`}>Connect With Us</Text>

      <View style={tw`flex-row justify-center mb-8`}>
        <TouchableOpacity style={tw`mx-3`} onPress={() => Linking.openURL("https://twitter.com/studyverse")}>
          <View
            style={tw`w-12 h-12 rounded-full bg-${isDarkMode ? "gray-800" : "gray-100"} items-center justify-center`}
          >
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-3`} onPress={() => Linking.openURL("https://facebook.com/studyverse")}>
          <View
            style={tw`w-12 h-12 rounded-full bg-${isDarkMode ? "gray-800" : "gray-100"} items-center justify-center`}
          >
            <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-3`} onPress={() => Linking.openURL("https://instagram.com/studyverse")}>
          <View
            style={tw`w-12 h-12 rounded-full bg-${isDarkMode ? "gray-800" : "gray-100"} items-center justify-center`}
          >
            <Ionicons name="logo-instagram" size={24} color="#E1306C" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-3`} onPress={() => Linking.openURL("https://linkedin.com/company/studyverse")}>
          <View
            style={tw`w-12 h-12 rounded-full bg-${isDarkMode ? "gray-800" : "gray-100"} items-center justify-center`}
          >
            <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={tw`items-center pb-8`}>
        <Text style={tw`text-${isDarkMode ? "gray-500" : "gray-500"} text-sm`}>
          © 2023 StudyVerse. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  )
}

export default AboutScreen

