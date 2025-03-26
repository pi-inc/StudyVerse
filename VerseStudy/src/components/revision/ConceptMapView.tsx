"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Svg, { Path, Circle, G, Text as SvgText } from "react-native-svg"
import { PinchGestureHandler, State } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window")

// Mock data for concept map
const conceptMapData = {
  center: { id: "react-native", label: "React Native" },
  nodes: [
    { id: "components", label: "Components", x: 0, y: -120 },
    { id: "styling", label: "Styling", x: 120, y: 0 },
    { id: "navigation", label: "Navigation", x: 0, y: 120 },
    { id: "state", label: "State Management", x: -120, y: 0 },

    { id: "functional", label: "Functional", x: -60, y: -180 },
    { id: "class", label: "Class-based", x: 60, y: -180 },

    { id: "stylesheet", label: "StyleSheet", x: 200, y: -60 },
    { id: "flexbox", label: "Flexbox", x: 200, y: 60 },

    { id: "stack", label: "Stack", x: 60, y: 180 },
    { id: "tabs", label: "Tabs", x: -60, y: 180 },

    { id: "redux", label: "Redux", x: -200, y: -60 },
    { id: "context", label: "Context API", x: -200, y: 60 },
  ],
  connections: [
    { from: "react-native", to: "components" },
    { from: "react-native", to: "styling" },
    { from: "react-native", to: "navigation" },
    { from: "react-native", to: "state" },

    { from: "components", to: "functional" },
    { from: "components", to: "class" },

    { from: "styling", to: "stylesheet" },
    { from: "styling", to: "flexbox" },

    { from: "navigation", to: "stack" },
    { from: "navigation", to: "tabs" },

    { from: "state", to: "redux" },
    { from: "state", to: "context" },
  ],
}

const ConceptMapView = () => {
  const { theme } = useTheme()
  const [scale, setScale] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)

  const panRef = useRef(new Animated.ValueXY()).current
  const scaleRef = useRef(new Animated.Value(1)).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panRef.setOffset({
          x: panRef.x._value,
          y: panRef.y._value,
        })
        panRef.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([null, { dx: panRef.x, dy: panRef.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        panRef.flattenOffset()
        setTranslateX(panRef.x._value)
        setTranslateY(panRef.y._value)
      },
    }),
  ).current

  const onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: scaleRef } }], { useNativeDriver: false })

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setScale(scale * event.nativeEvent.scale)
      scaleRef.setValue(1)
    }
  }

  const centerX = width / 2
  const centerY = height / 2

  const renderNode = (node, index) => {
    const nodeX = centerX + node.x * scale + translateX
    const nodeY = centerY + node.y * scale + translateY

    return (
      <G key={node.id}>
        <Circle
          cx={nodeX}
          cy={nodeY}
          r={40 * scale}
          fill={node.id === "react-native" ? theme.primary : theme.card}
          stroke={theme.border}
          strokeWidth={1}
        />
        <SvgText
          x={nodeX}
          y={nodeY}
          fontSize={12 * scale}
          fontWeight="bold"
          fill={node.id === "react-native" ? theme.primaryForeground : theme.foreground}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {node.label}
        </SvgText>
      </G>
    )
  }

  const renderConnection = (connection, index) => {
    const fromNode =
      connection.from === "react-native"
        ? { x: 0, y: 0 }
        : conceptMapData.nodes.find((node) => node.id === connection.from)

    const toNode = conceptMapData.nodes.find((node) => node.id === connection.to)

    if (!fromNode || !toNode) return null

    const fromX = centerX + fromNode.x * scale + translateX
    const fromY = centerY + fromNode.y * scale + translateY
    const toX = centerX + toNode.x * scale + translateX
    const toY = centerY + toNode.y * scale + translateY

    return (
      <Path
        key={`${connection.from}-${connection.to}`}
        d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
        stroke={theme.primary}
        strokeWidth={2 * scale}
        opacity={0.7}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.foreground }]}>React Native Concept Map</Text>
      <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>Pinch to zoom and drag to pan</Text>

      <PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchHandlerStateChange}>
        <Animated.View style={styles.svgContainer} {...panResponder.panHandlers}>
          <Svg width={width} height={height - 150}>
            {conceptMapData.connections.map(renderConnection)}
            {conceptMapData.nodes.map(renderNode)}
            {renderNode(conceptMapData.center)}
          </Svg>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  svgContainer: {
    flex: 1,
    width: "100%",
  },
})

export default ConceptMapView

