"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Maximize, Download, Share2, Printer, Plus, Minus, RotateCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

interface ConceptMapProps {
  courseId: string
  topicId: string
}

type Node = {
  id: string
  label: string
  x: number
  y: number
  color: string
}

type Edge = {
  source: string
  target: string
  label: string
}

export function ConceptMap({ courseId, topicId }: ConceptMapProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Mock data for arrays concept map
  const arrayConceptMap = {
    nodes: [
      { id: "arrays", label: "Arrays", x: 400, y: 250, color: "#7C3AED" }, // Purple
      { id: "memory", label: "Contiguous Memory", x: 250, y: 150, color: "#3B82F6" }, // Blue
      { id: "access", label: "Random Access", x: 550, y: 150, color: "#3B82F6" }, // Blue
      { id: "types", label: "Array Types", x: 250, y: 350, color: "#0EA5E9" }, // Light Blue
      { id: "operations", label: "Operations", x: 550, y: 350, color: "#0EA5E9" }, // Light Blue
      { id: "1d", label: "1D Arrays", x: 150, y: 450, color: "#14B8A6" }, // Teal
      { id: "2d", label: "2D Arrays", x: 250, y: 450, color: "#14B8A6" }, // Teal
      { id: "dynamic", label: "Dynamic Arrays", x: 350, y: 450, color: "#14B8A6" }, // Teal
      { id: "insertion", label: "Insertion", x: 450, y: 450, color: "#10B981" }, // Green
      { id: "deletion", label: "Deletion", x: 550, y: 450, color: "#10B981" }, // Green
      { id: "search", label: "Search", x: 650, y: 450, color: "#10B981" }, // Green
    ],
    edges: [
      { source: "arrays", target: "memory", label: "stored in" },
      { source: "arrays", target: "access", label: "provides" },
      { source: "arrays", target: "types", label: "has" },
      { source: "arrays", target: "operations", label: "supports" },
      { source: "types", target: "1d", label: "" },
      { source: "types", target: "2d", label: "" },
      { source: "types", target: "dynamic", label: "" },
      { source: "operations", target: "insertion", label: "" },
      { source: "operations", target: "deletion", label: "" },
      { source: "operations", target: "search", label: "" },
    ],
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 150))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50))
  }

  const handleReset = () => {
    setZoom(100)
    setRotation(0)
  }

  const handleRotateClockwise = () => {
    setRotation(rotation + 15)
  }

  const handleDownload = () => {
    toast({
      title: "Concept map downloaded",
      description: "The concept map has been downloaded as an image",
      className: "bg-gradient-to-r from-study-teal/20 to-study-green/20 border-study-teal",
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print prepared",
      description: "The concept map is ready to print",
      className: "bg-gradient-to-r from-study-purple/20 to-study-blue/20 border-study-purple",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share options",
      description: "You can share this concept map via email or link",
      className: "bg-gradient-to-r from-study-blue/20 to-study-teal/20 border-study-blue",
    })
  }

  const handleGenerateAI = () => {
    toast({
      title: "AI Generation",
      description: "Generating a more detailed concept map with AI...",
      className: "bg-gradient-to-r from-study-purple/20 to-study-blue/20 border-study-purple",
    })
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-study-green to-study-teal" />
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-2xl">Arrays Concept Map</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-study-green/20 text-study-green">Visual Learning</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-study-purple/10 border-study-purple/30 text-study-purple hover:bg-study-purple/20"
            onClick={handleGenerateAI}
          >
            <Sparkles className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t border-b p-2 flex justify-between items-center bg-muted/30">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleZoomOut}>
              <Minus className="h-4 w-4" />
            </Button>
            <Slider
              value={[zoom]}
              min={50}
              max={150}
              step={1}
              onValueChange={(value) => setZoom(value[0])}
              className="w-32"
            />
            <Button variant="ghost" size="icon" onClick={handleZoomIn}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleRotateClockwise}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-auto p-4 bg-muted/10" style={{ height: "500px" }}>
          <div
            ref={canvasRef}
            className="relative w-full h-full"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.3s ease",
            }}
          >
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {arrayConceptMap.edges.map((edge, index) => {
                const source = arrayConceptMap.nodes.find((n) => n.id === edge.source)
                const target = arrayConceptMap.nodes.find((n) => n.id === edge.target)

                if (!source || !target) return null

                return (
                  <g key={`${edge.source}-${edge.target}`}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray={edge.label ? "0" : "5,5"}
                    />
                    {edge.label && (
                      <text
                        x={(source.x + target.x) / 2}
                        y={(source.y + target.y) / 2 - 5}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="12"
                        className="pointer-events-none"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Nodes */}
            {arrayConceptMap.nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute rounded-md p-2 shadow-md cursor-pointer transition-transform hover:scale-105"
                style={{
                  left: node.x - 50,
                  top: node.y - 20,
                  width: "100px",
                  backgroundColor: `${node.color}20`,
                  borderColor: node.color,
                  borderWidth: "2px",
                  color: node.color,
                }}
              >
                <div className="text-center font-medium">{node.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

