import { CourseRequestForm } from "@/components/course-request-form"

export default function CourseRequestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Request a Custom Course</h1>
      <CourseRequestForm />
    </div>
  )
}

