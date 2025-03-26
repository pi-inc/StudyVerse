import type React from "react"
import { Feather } from "@expo/vector-icons"

interface IconProps {
  color: string
  size?: number
}

const ReviseIcon: React.FC<IconProps> = ({ color, size = 24 }) => {
  return <Feather name="refresh-cw" size={size} color={color} />
}

export default ReviseIcon

