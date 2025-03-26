"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, ArrowLeft, ChevronDown, X, BookOpen, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { MobileLayout } from "@/components/mobile-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSearchParams } from "next/navigation"

export default function ExploreCoursesPage() {
  const searchParams = useSearchParams()
  const initialCollection = searchParams.get("collection")

  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCollection ? [initialCollection] : [])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Learn the basics of computer science and programming",
      level: "Beginner",
      duration: "8 weeks",
      category: "Computer Science",
      color: "from-study-purple to-study-blue",
      icon: "💻",
      rating: 4.8,
      students: 1250,
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master essential data structures and algorithms",
      level: "Intermediate",
      duration: "10 weeks",
      category: "Computer Science",
      color: "from-study-blue to-study-teal",
      icon: "🧮",
      rating: 4.7,
      students: 980,
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      description: "Understand the core concepts of machine learning",
      level: "Advanced",
      duration: "12 weeks",
      category: "Data Science",
      color: "from-study-teal to-study-green",
      icon: "🤖",
      rating: 4.9,
      students: 1540,
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Build modern web applications from scratch",
      level: "Beginner to Intermediate",
      duration: "14 weeks",
      category: "Web Development",
      color: "from-study-green to-study-yellow",
      icon: "🌐",
      rating: 4.6,
      students: 2100,
    },
    {
      id: 5,
      title: "Data Visualization with Python",
      description: "Learn to create compelling visualizations with Python",
      level: "Intermediate",
      duration: "8 weeks",
      category: "Data Science",
      color: "from-study-yellow to-study-orange",
      icon: "📊",
      rating: 4.6,
      students: 1120,
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      description: "Learn to create beautiful and functional user interfaces",
      level: "Beginner",
      duration: "8 weeks",
      category: "Design",
      color: "from-study-orange to-study-red",
      icon: "🎨",
      rating: 4.7,
      students: 1320,
    },
    {
      id: 7,
      title: "Mobile App Development",
      description: "Create native mobile applications for iOS and Android",
      level: "Intermediate",
      duration: "10 weeks",
      category: "Mobile Development",
      color: "from-study-purple to-study-blue",
      icon: "📱",
      rating: 4.5,
      students: 870,
    },
    {
      id: 8,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and patterns",
      level: "Advanced",
      duration: "6 weeks",
      category: "Web Development",
      color: "from-study-blue to-study-teal",
      icon: "🔧",
      rating: 4.8,
      students: 1450,
    },
  ]

  const categories = Array.from(new Set(courses.map((c) => c.category)))
  const levels = Array.from(new Set(courses.map((c) => c.level)))

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
  }

  const filteredCourses = courses.filter((course) => {
    // Search filter
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)

    // Level filter
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level)

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return b.students - a.students
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "newest") return b.id - a.id
    return 0
  })

  const focusSearch = () => {
    searchInputRef.current?.focus()
  }

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/courses">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold gradient-text">Explore Courses</h1>
          </div>

          <Button
            asChild
            size="sm"
            className="h-8 px-3 bg-gradient-to-r from-study-purple to-study-blue text-white shadow-sm"
          >
            <Link href="/courses/request">Request Course</Link>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search courses..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-md">
              <div className="py-4 h-full flex flex-col">
                <h3 className="text-lg font-medium mb-4">Filter Courses</h3>

                <div className="space-y-6 flex-1 overflow-auto">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          size="sm"
                          className={selectedCategories.includes(category) ? "bg-primary text-primary-foreground" : ""}
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Level</h4>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <Button
                          key={level}
                          variant={selectedLevels.includes(level) ? "default" : "outline"}
                          size="sm"
                          className={selectedLevels.includes(level) ? "bg-primary text-primary-foreground" : ""}
                          onClick={() => toggleLevel(level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t mt-4">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-1">Apply Filters</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <span className="text-xs">Sort</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("popular")}>Most Popular</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>Highest Rated</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active filters */}
        {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-muted"
                  onClick={() => toggleCategory(category)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            {selectedLevels.map((level) => (
              <Badge key={level} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                {level}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-muted"
                  onClick={() => toggleLevel(level)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results count */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {sortedCourses.length} {sortedCourses.length === 1 ? "course" : "courses"} found
          </p>
        </div>

        {/* Course List */}
        <div className="space-y-3">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/courses/${course.id}`}>
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className={`h-1.5 bg-gradient-to-r ${course.color}`}></div>
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="text-2xl">{course.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base line-clamp-1">{course.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{course.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                            <div className="flex items-center text-xs">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}

