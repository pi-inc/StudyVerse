import { StudyBuddyFinder } from "@/components/study-buddy-finder"

export default function StudyBuddiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Study Buddies</h1>
        <p className="text-muted-foreground">Find and connect with other students studying similar subjects.</p>
      </div>

      <StudyBuddyFinder />
    </div>
  )
}

