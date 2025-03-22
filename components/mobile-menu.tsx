"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[300px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/tutor" className="text-lg font-medium hover:underline">
            Tutor
          </Link>
          <Link href="/courses" className="text-lg font-medium hover:underline">
            Courses
          </Link>
          <Link href="/revise" className="text-lg font-medium hover:underline">
            Revise
          </Link>
          <Link href="/plan" className="text-lg font-medium hover:underline">
            Plan
          </Link>
          <Link href="/social" className="text-lg font-medium hover:underline">
            Social
          </Link>
          <div className="h-px bg-border my-2" />
          <Link href="/profile" className="text-lg font-medium hover:underline">
            Profile
          </Link>
          <Link href="/settings" className="text-lg font-medium hover:underline">
            Settings
          </Link>
          <Link href="/help" className="text-lg font-medium hover:underline">
            Help
          </Link>
          <Link href="/about" className="text-lg font-medium hover:underline">
            About
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

