"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Svg, { Path, Circle, G, Text as SvgText } from "react-native-svg"
import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

// Mock data
const learningPath = {
  title: "React Native Developer Path",
  nodes: [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      status: "completed",
      x: 100,
      y: 100,
    },
    {
      id: "2",
      title: "React Basics",
      status: "completed",
      x: 250,
      y: 100,
    },
    {
      id: "3",
      title: "React Native Intro",
      status: "in-progress",
      x: 400,
      y: 100,
    },
    {
      id: "4",
      title: "Navigation",
      status: "locked",
      x: 550,
      y: 100,
    },
    {
      id: "5",
      title: "State Management",
      status: "locked",
      x: 700,
      y: 100,
    },
    {
      id: "6",
      title: "API Integration",
      status: "locked",
      x: 850,
      y: 100,
    },
    {
      id: "7",
      title: "Advanced UI",
      status: "locked",
      x: 1000,
      y: 100,
    },
  ],
  connections: [
    { from: "1", to: "2" },
    { from: "2", to: "3" },
    { from: "3", to: "4" },
    { from: "4", to: "5" },
    { from: "5", to: "6" },
    { from: "6", to: "7" },
  ],
}

const LearningPathMap = () => {
  const { theme } = useTheme()
  const [selectedNode, setSelectedNode] = useState(null)

  const getNodeColor = (status) => {
    switch (status) {
      case "completed":
        return theme.study.green
      case "in-progress":
        return theme.study.blue
      case "locked":
        return theme.muted
      default:
        return theme.primary
    }
  }

  const getNodeIcon = (status) => {
    switch (status) {
      case "completed":
        return "check"
      case "in-progress":
        return "play"
      case "locked":
        return "lock"
      default:
        return "circle"
    }
  }

  const renderConnections = () => {
    return learningPath.connections.map((connection, index) => {
      const fromNode = learningPath.nodes.find((node) => node.id === connection.from)
      const toNode = learningPath.nodes.find((node) => node.id === connection.to)

      if (!fromNode || !toNode) return null

      const fromStatus = fromNode.status
      const toStatus = toNode.status

      const isActive = fromStatus === "completed" || fromStatus === "in-progress"

      return (
        <Path
          key={`${connection.from}-${connection.to}`}
          d={`M ${fromNode.x + 30} ${fromNode.y} L ${toNode.x - 30} ${toNode.y}`}
          stroke={isActive ? theme.primary : theme.border}
          strokeWidth={3}
          strokeDasharray={isActive ? "none" : "5,5"}
        />
      )
    })
  }

  const renderNodes = () => {
    return learningPath.nodes.map((node) => {
      const isSelected = selectedNode && selectedNode.id === node.id
      const nodeColor = getNodeColor(node.status)
      const nodeIcon = getNodeIcon(node.status)

      return (
        <G key={node.id}>
          <Circle
            cx={node.x}
            cy={node.y}
            r={30}
            fill={isSelected ? theme.primary : nodeColor}
            stroke={isSelected ? theme.primary : "transparent"}
            strokeWidth={isSelected ? 4 : 0}
          />
          <Feather
            name={nodeIcon}
            size={16}
            color="white"
            style={{
              position: "absolute",
              top: node.y - 8,
              left: node.x - 8,
            }}
          />
          <SvgText
            x={node.x}
            y={node.y + 50}
            fontSize={12}
            fontWeight={isSelected ? "bold" : "normal"}
            fill={theme.foreground}
            textAnchor="middle"
          >
            {node.title}
          </SvgText>
          <TouchableOpacity
            onPress={() => setSelectedNode(node)}
            style={{
              position: "absolute",
              top: node.y - 30,
              left: node.x - 30,
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        </G>
      )
    })
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.foreground }]}>{learningPath.title}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Svg width={1050} height={200}>
          {renderConnections()}
          {renderNodes()}
        </Svg>
      </ScrollView>

      {selectedNode && (
        <View style={[styles.nodeDetails, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.nodeTitle, { color: theme.foreground }]}>{selectedNode.title}</Text>

          <View style={styles.nodeStatus}>
            <View style={[styles.statusIndicator, { backgroundColor: getNodeColor(selectedNode.status) }]} />
            <Text style={[styles.statusText, { color: theme.mutedForeground }]}>
              {selectedNode.status === "completed"
                ? "Completed"
                : selectedNode.status === "in-progress"
                  ? "In Progress"
                  : "Locked"}
            </Text>
          </View>

          {selectedNode.status !== "locked" && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                // In a real app, navigate to the appropriate screen
                console.log("Navigate to", selectedNode.title)
              }}
            >
              <LinearGradient
                colors={[theme.study.purple, theme.study.blue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionButtonGradient}
              >
                <Text style={styles.actionButtonText}>
                  {selectedNode.status === "completed" ? "Review" : "Continue"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  nodeDetails: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  nodeTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  nodeStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  actionButton: {
    alignSelf: "flex-start",
    borderRadius: 8,
    overflow: "hidden",
  },
  actionButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
})

export default LearningPathMap

