import AboutPageClient from "@/app/about/AboutPageClient";
import { STATIC_HOME, STATIC_PROJECTS } from "@/lib/static-data";

export default function AboutPage() {
  return <AboutPageClient initialData={{ home: STATIC_HOME, projects: STATIC_PROJECTS }} />;
}
