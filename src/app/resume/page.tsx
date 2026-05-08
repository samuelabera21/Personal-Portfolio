import ResumePageClient from "@/app/resume/ResumePageClient";
import { STATIC_HOME, STATIC_PROJECTS } from "@/lib/static-data";

export default function ResumePage() {
  return <ResumePageClient initialData={{ home: STATIC_HOME, projects: STATIC_PROJECTS }} />;
}
