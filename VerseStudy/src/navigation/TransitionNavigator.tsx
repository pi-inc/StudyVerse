import { createStackNavigator } from "@react-navigation/stack"
import { TransitionPresets } from "@react-navigation/stack"

// Create a custom navigator that uses our transitions
const Stack = createStackNavigator()

// Define custom transition presets
const CustomTransitions = {
  SlideFromRight: {
    ...TransitionPresets.SlideFromRightIOS,
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      }
    },
  },
  FadeFromBottom: {
    ...TransitionPresets.DefaultTransition,
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height * 0.1, 0],
              }),
            },
          ],
        },
      }
    },
  },
  ScaleFromCenter: {
    ...TransitionPresets.DefaultTransition,
    cardStyleInterpolator: ({ current }) => {
      return {
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      }
    },
  },
}

// Export the custom transitions
export { CustomTransitions }

// Create a TransitionNavigator component
const TransitionNavigator = ({ children, initialRouteName, screenOptions = {} }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        ...screenOptions,
      }}
    >
      {children}
    </Stack.Navigator>
  )
}

export default TransitionNavigator

