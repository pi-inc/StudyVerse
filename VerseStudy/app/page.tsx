import { MobileLayout } from "@/components/mobile-layout"
import { RecentCourses } from "@/components/recent-courses"
import { DailyPlan } from "@/components/daily-plan"
import { StreakAchievements } from "@/components/streak-achievements"

export default function Home() {
  return (
    <MobileLayout>
      <div className="space-y-5 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold gradient-text">Welcome back!</h1>

        <div className="grid grid-cols-1 gap-5">
          {/* Continue learning section - Most important for retention */}
          <div>
            <RecentCourses />
          </div>

          {/* Streak counter and achievements */}
          <div>
            <StreakAchievements />
          </div>

          {/* Today's study plan - Actionable daily tasks */}
          <div>
            <DailyPlan />
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

