import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MobileLayout } from "@/components/mobile-layout"

export default function CourseDetailLoading() {
  return (
    <MobileLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-7 w-40" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        {/* Course Header */}
        <Card className="overflow-hidden border-none shadow-md">
          <Skeleton className="h-2 w-full" />
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />

                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                <div className="flex gap-4 pt-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="pt-2">
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>

                <Skeleton className="h-10 w-full rounded-md mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />

          <Card>
            <CardHeader className="p-4 pb-2">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  )
}

