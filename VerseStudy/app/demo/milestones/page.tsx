import { MilestoneDemo } from "@/components/milestone-demo"

export default function MilestoneDemoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Milestone Celebrations</h1>
        <p className="text-muted-foreground">
          Preview the different milestone celebrations you can earn while learning.
        </p>
      </div>

      <MilestoneDemo />
    </div>
  )
}

