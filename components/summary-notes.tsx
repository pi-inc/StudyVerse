"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronDown, ChevronUp, Copy, Download, Printer, Share2, Edit, Star, StarHalf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface SummaryNotesProps {
  courseId: string
  topicId: string
}

export function SummaryNotes({ courseId, topicId }: SummaryNotesProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("definition")
  const { toast } = useToast()

  // Mock data for arrays topic
  const arraySummary = {
    title: "Arrays",
    sections: [
      {
        id: "definition",
        title: "Definition & Basics",
        content: `
          <p>An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.</p>
          
          <p>Key characteristics of arrays:</p>
          <ul>
            <li>Elements are stored in contiguous memory locations</li>
            <li>Each element can be accessed directly using its index</li>
            <li>Arrays have a fixed size (in most traditional implementations)</li>
            <li>All elements in an array must be of the same data type</li>
          </ul>
        `,
      },
      {
        id: "operations",
        title: "Common Operations",
        content: `
          <p>Arrays support several basic operations:</p>
          
          <h4>1. Accessing Elements</h4>
          <pre><code>// Access element at index i
element = array[i];</code></pre>
          <p>Time Complexity: O(1)</p>
          
          <h4>2. Insertion</h4>
          <pre><code>// Insert at the end (if space available)
array[size] = newElement;
size++;

// Insert at index i (requires shifting elements)
for (int j = size; j > i; j--) {
    array[j] = array[j-1];
}
array[i] = newElement;
size++;</code></pre>
          <p>Time Complexity: O(n) for insertion at arbitrary position (due to shifting), O(1) for insertion at the end</p>
          
          <h4>3. Deletion</h4>
          <pre><code>// Delete element at index i
for (int j = i; j < size - 1; j++) {
    array[j] = array[j+1];
}
size--;</code></pre>
          <p>Time Complexity: O(n) (due to shifting elements)</p>
          
          <h4>4. Searching</h4>
          <pre><code>// Linear search
for (int i = 0; i < size; i++) {
    if (array[i] == target) {
        return i; // Found at index i
    }
}
return -1; // Not found</code></pre>
          <p>Time Complexity: O(n) for unsorted arrays, O(log n) for binary search on sorted arrays</p>
        `,
      },
      {
        id: "types",
        title: "Types of Arrays",
        content: `
          <h4>1. One-Dimensional Arrays</h4>
          <p>The most basic type of array that stores elements in a linear fashion.</p>
          <pre><code>int numbers[5] = {1, 2, 3, 4, 5};</code></pre>
          
          <h4>2. Multi-Dimensional Arrays</h4>
          <p>Arrays that store elements in a tabular form with rows and columns.</p>
          <pre><code>int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};</code></pre>
          
          <h4>3. Dynamic Arrays</h4>
          <p>Arrays that can resize themselves when needed. Examples include ArrayList in Java, vector in C++, and list in Python.</p>
          <pre><code>// In Java
ArrayList<Integer> dynamicArray = new ArrayList<>();
dynamicArray.add(1);
dynamicArray.add(2);</code></pre>
        `,
      },
      {
        id: "advantages",
        title: "Advantages & Disadvantages",
        content: `
          <h4>Advantages:</h4>
          <ul>
            <li>Random access to elements in O(1) time</li>
            <li>Good locality of reference (elements are stored contiguously in memory)</li>
            <li>Memory efficient (minimal overhead per element)</li>
            <li>Simple and easy to use</li>
          </ul>
          
          <h4>Disadvantages:</h4>
          <ul>
            <li>Fixed size (for static arrays)</li>
            <li>Insertion and deletion operations are expensive (O(n) time complexity)</li>
            <li>Memory may be wasted if the array is not fully utilized</li>
            <li>All elements must be of the same type</li>
          </ul>
        `,
      },
      {
        id: "applications",
        title: "Applications",
        content: `
          <p>Arrays are used in a wide variety of applications:</p>
          <ul>
            <li>Implementing other data structures like stacks, queues, heaps, hash tables, etc.</li>
            <li>Storing and manipulating matrices and vectors in scientific computing</li>
            <li>Implementing sorting algorithms (e.g., merge sort, quick sort)</li>
            <li>Buffering data in I/O operations</li>
            <li>Implementing dynamic programming solutions</li>
            <li>Image processing (2D arrays)</li>
            <li>Database indexing</li>
          </ul>
        `,
      },
    ],
  }

  const handleCopySection = (sectionId: string) => {
    const section = arraySummary.sections.find((s) => s.id === sectionId)
    if (section) {
      // In a real app, this would copy the text content without HTML tags
      navigator.clipboard.writeText(section.content.replace(/<[^>]*>/g, ""))

      toast({
        title: "Section copied",
        description: `${section.title} has been copied to clipboard`,
        className: "bg-gradient-to-r from-study-blue/20 to-study-purple/20 border-study-blue",
      })
    }
  }

  const handleDownload = () => {
    toast({
      title: "Summary downloaded",
      description: "The summary notes have been downloaded as a PDF",
      className: "bg-gradient-to-r from-study-teal/20 to-study-green/20 border-study-teal",
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print prepared",
      description: "The summary is ready to print",
      className: "bg-gradient-to-r from-study-purple/20 to-study-blue/20 border-study-purple",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share options",
      description: "You can share these notes via email or link",
      className: "bg-gradient-to-r from-study-blue/20 to-study-teal/20 border-study-blue",
    })
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-study-teal to-study-green" />
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-study-teal" />
            {arraySummary.title} Summary Notes
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-study-teal/20 text-study-teal">Comprehensive</Badge>
            <div className="flex items-center gap-1 text-study-yellow">
              <Star className="h-4 w-4 fill-study-yellow" />
              <Star className="h-4 w-4 fill-study-yellow" />
              <Star className="h-4 w-4 fill-study-yellow" />
              <Star className="h-4 w-4 fill-study-yellow" />
              <StarHalf className="h-4 w-4 fill-study-yellow" />
              <span className="text-xs text-muted-foreground ml-1">(4.5)</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {arraySummary.sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-md overflow-hidden"
            >
              <div
                className={`flex justify-between items-center p-4 cursor-pointer ${
                  expandedSection === section.id ? "bg-muted/50" : ""
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <h3 className="font-medium">{section.title}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopySection(section.id)
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {expandedSection === section.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedSection === section.id && (
                <div className="p-4 border-t bg-card">
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

