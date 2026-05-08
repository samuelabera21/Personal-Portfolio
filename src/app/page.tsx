import HomePageClient from "@/app/HomePageClient";
import { STATIC_HOME } from "@/lib/static-data";

export default function HomePage() {
  return <HomePageClient initialHomeData={STATIC_HOME} />;
}
