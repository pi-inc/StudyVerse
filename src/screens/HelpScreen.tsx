import { View, Text, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import tw from "twrnc"
import { useStore } from "../store"
import { List, ListItem } from "../components/ui/List"

const HelpScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode)

  return (
    <ScrollView style={tw`flex-1 bg-${isDarkMode ? "gray-900" : "white"}`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-xl font-semibold mb-6 text-${isDarkMode ? "white" : "gray-900"}`}>Help & Support</Text>

        <List header="Resources" bordered style={tw`mb-6`}>
          <ListItem
            title="User Guide"
            leftIcon={<Ionicons name="book-outline" size={24} color="#8B5CF6" />}
            onPress={() => {}}
          />
          <ListItem
            title="FAQs"
            leftIcon={<Ionicons name="help-circle-outline" size={24} color="#3B82F6" />}
            onPress={() => {}}
          />
          <ListItem
            title="Video Tutorials"
            leftIcon={<Ionicons name="videocam-outline" size={24} color="#14B8A6" />}
            onPress={() => {}}
          />
        </List>

        <Text style={tw`text-lg font-semibold mb-4 text-${isDarkMode ? "white" : "gray-900"}`}>Contact Support</Text>

        <List bordered style={tw`mb-6`}>
          <ListItem
            title="Live Chat"
            leftIcon={<Ionicons name="chatbubble-outline" size={24} color="#22C55E" />}
            onPress={() => {}}
          />
          <ListItem
            title="Email Support"
            leftIcon={<Ionicons name="mail-outline" size={24} color="#EAB308" />}
            onPress={() => {}}
          />
          <ListItem
            title="Phone Support"
            leftIcon={<Ionicons name="call-outline" size={24} color="#EF4444" />}
            onPress={() => {}}
          />
        </List>

        <Text style={tw`text-lg font-semibold mb-4 text-${isDarkMode ? "white" : "gray-900"}`}>Troubleshooting</Text>

        <List bordered>
          <ListItem
            title="Reset Application"
            leftIcon={<Ionicons name="refresh-outline" size={24} color="#EC4899" />}
            onPress={() => {}}
          />
          <ListItem
            title="Report a Bug"
            leftIcon={<Ionicons name="bug-outline" size={24} color="#F97316" />}
            onPress={() => {}}
          />
          <ListItem
            title="Check for Updates"
            leftIcon={<Ionicons name="sync-outline" size={24} color="#8B5CF6" />}
            onPress={() => {}}
          />
        </List>
      </View>
    </ScrollView>
  )
}

export default HelpScreen

