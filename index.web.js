import { registerRootComponent } from "expo"
import { activateKeepAwake } from "expo-keep-awake"

import App from "./App"

const __DEV__ = process.env.NODE_ENV !== "production"

if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(App)

