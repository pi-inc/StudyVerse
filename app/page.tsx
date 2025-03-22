import { MobileLayout } from "@/components/mobile-layout"
import { RecentCourses } from "@/components/recent-courses"
import { DailyPlan } from "@/components/daily-plan"
import { ProgressSummary } from "@/components/progress-summary"
import { RecommendedContent } from "@/components/recommended-content"

export default function Home() {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold gradient-text">Welcome back!</h1>

        {/* Continue learning section */}
        <RecentCourses />

        {/* Today's study plan */}
        <DailyPlan />

        {/* Progress highlights */}
        <ProgressSummary />

        {/* Personalized recommendations */}
        <RecommendedContent />
      </div>
    </MobileLayout>
  )
}

