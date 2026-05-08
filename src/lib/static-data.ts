import { DashboardStats } from "@/types/dashboard";
import { HomeData } from "@/types/home";
import { Message } from "@/types/message";
import { Post } from "@/types/post";
import { Profile } from "@/types/profile";
import { Project } from "@/types/project";
import { FeatureFlags } from "@/types/settings";
import { GroupedSkills, Skill } from "@/types/skill";

export const STATIC_SETTINGS: FeatureFlags = {
  showProjects: true,
  showSkills: true,
  showBlog: false,
  availableForHire: true,
};

export const STATIC_PROFILE: Profile = {
  id: "profile-1",
  name: "Samuel Abera",
  role: "Aspiring Software Engineer | AI Focus",
  bio: "Aspiring Software Engineer and Web Developer focused on building scalable, user-centered applications. Passionate about Artificial Intelligence and its potential to solve real-world problems. Continuously learning and applying modern technologies to create impactful and efficient software solutions.",
  avatarUrl: "/fav.jpg",
  resumeUrl: "/resume.png",
  location: "Ethiopia",
  available: true,
  socialLinks: [
    { id: "social-1", platform: "github", url: "https://github.com/samuelabera21" },
    { id: "social-2", platform: "linkedin", url: "https://linkedin.com/in/samuelabera21" },
    { id: "social-3", platform: "facebook", url: "https://facebook.com/samuelabera21" },
    { id: "social-4", platform: "tiktok", url: "https://tiktok.com/@dn_sami" },
  ],
};

export const STATIC_SKILLS_GROUPED: GroupedSkills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS","Bootstrap", "Framer Motion","HTML", "CSS", "JavaScript"],
  Backend: ["Node.js", "Express.js", "FastAPI", "Spring Boot","Laravel"],
  Tools: ["Git", "GitHub", "VS Code", "Postman","Jira","Figma"],
  Database: ["PostgreSQL", "MySQL", "MongoDB","Prisma"],
    "AI / ML": ["Python", "Machine Learning", "Prompt Engineering","RAG", "TensorFlow", "PyTorch"],
    Communication: ["Team Collaboration", "Basic Project Management", "Presentation", "Written Communication"],
};

export const STATIC_SKILLS: Skill[] = Object.entries(STATIC_SKILLS_GROUPED).flatMap(
  ([category, names], categoryIndex) =>
    names.map((name, index) => ({
      id: `skill-${categoryIndex + 1}-${index + 1}`,
      name,
      category,
    }))
);

export const STATIC_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "SkillHub | Online Learning Platform",
    description: "Modern online learning platform with course browsing, progress workflows, and clean UI.",
    imageUrl: "/Learn.jpg",
    githubUrl: "https://github.com/samuelabera21/SkillHub_online_learning",
    liveUrl: "https://ethi-skill.netlify.app/",
    techStack: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    featured: true,
    published: true,
    createdAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: "project-2",
    title: "Sira Gebeya | Job Marketplace",
    description: "Responsive job marketplace platform focused on employers and job seekers.",
    imageUrl: "/sra.png",
    githubUrl: "https://github.com/samuelabera21/sira-gebeya",
    liveUrl: "https://resplendent-starship-9acec3.netlify.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Quill.js","Tailwind CSS"],
    featured: true,
    published: true,
    createdAt: "2026-04-08T00:00:00.000Z",
  },
  {
    id: "project-3",
    title: "ፍኖት Ethiopian AI HUB",
    description: "AI tools platform bringing productivity, OCR, and workflow features together.",
    imageUrl: "/AI.png",
    githubUrl: "https://github.com/samuelabera21/Samuel_AI_Tools_App",
    liveUrl: "https://majestic-gumdrop-e713f7.netlify.app/",
    techStack: ["Python", "JavaScript", "HTML", "CSS"],
    featured: true,
    published: true,
    createdAt: "2026-04-12T00:00:00.000Z",
  },
  {
    id: "project-4",
    title: "Ethiopian Orthodox Church Platform",
    description: "A bilingual (English & Amharic) platform for Ethiopian Orthodox church content: books (Google Drive view/download), videos (YouTube + local media), teachings (Kidase texts with audio/images/translations), church history, holy angels reference, and an events calendar.",
    imageUrl: "/orthodox.png",
    githubUrl: "https://github.com/samuelabera21/Holy",
    liveUrl: "https://orthodox-tewahdo.netlify.app/",
    techStack: ["React 19.2.0", "React Router 7.13.0", " i18next + react-i18next", "ESLint"],
    featured: false,
    published: true,
    createdAt: "2026-04-17T00:00:00.000Z",
  },
  {
    id: "project-5",
    title: "House Rental System",
    description:
      "House Rental Management System is designed to simplify the process of finding and managing rental houses . The system will allow house owners to post information about their available houses through an online platform. Renters will be able to search for houses easily based on different criteria such as price, location, and number of rooms. The system will also allow users to register and log in so they can access system services securely.",
    imageUrl: "/Hr.png",
    githubUrl: "https://github.com/samuelabera21/house_rental_system",
    liveUrl: "https://house-rental-system-ten.vercel.app/",
    techStack: ["Next.js", "TypeScript", "PHP","Tailwind CSS"],
    featured: false,
    published: true,
    createdAt: "2026-04-21T00:00:00.000Z",
  },
  {
    id: "project-6",
    title: "Resume Generator",
    description: "DevResumeMagic 🚀 A modern web app that generates professional developer resumes from GitHub profiles.✨Features Instant Resume Generation - Enter any GitHub username real GitHub Data - Live data from GitHub API, PDF Export - Download as professional PDF, Mobile Friendly - Works on all devices",
    imageUrl: "/Git.png",
    githubUrl: "https://github.com/samuelabera21/Resume-generator",
    liveUrl: "https://lighthearted-truffle-2fb80e.netlify.app",
    techStack: ["JavaScript (Vanilla)", "      GitHub API", " Browser Print to PDF", "HTML/CSS (Bootstrap)"],
    featured: false,
    published: true,
    createdAt: "2026-04-25T00:00:00.000Z",
  },
   {
    id: "project-7",
    title: "AI Stock Agent ",
    description: "An end-to-end AI-driven stock analysis platform that fetches live market data, engineers technical indicators, trains machine learning models, and delivers actionable investment recommendations (`BUY`, `SELL`, or `HOLD`). The system combines automated data retrieval from Yahoo Finance, feature engineering (moving averages, MACD, RSI, volatility).",
    imageUrl: "/stockai.png",
    githubUrl: "https://github.com/samuelabera21/Stock-Agent",
    liveUrl: "https://stock-agent-bn3k.vercel.app/",
    techStack: ["Python (Flask, scikit-learn, pandas, yfinance) ", "React ", "Vite ","JavaScript ","Pickle (model serialization) ","Render (backend deployment) ","Vercel (frontend deployment","HTML/CSS (Bootstrap)"],
    featured: false,
    published: true,
    createdAt: "2026-04-25T00:00:00.000Z",
  },
   {
    id: "project-8",
    title: "Job Portal System",
    description: "A full-featured job portal web application that connects employers and job seekers. Employers can create and manage company profiles, post and update jobs, review applications, and manage hiring workflows. Job seekers can search and filter listings, create profiles, upload CVs, apply to jobs, and use CV templates. The system includes user authentication, role-based access control, and an admin dashboard for managing users and content.",
    imageUrl: "/job.png",
    githubUrl: "https://github.com/samuelabera21/java-Fullstack-project",
    liveUrl: " https://github.com/samuelabera21/java-Fullstack-project",
    techStack: ["React", "jsPDF", "TypeScript"],
    featured: false,
    published: true,
    createdAt: "2026-04-25T00:00:00.000Z",
  },
];

export const STATIC_POSTS: Post[] = [
  // Blog removed for static portfolio — posts intentionally empty
];

export const STATIC_MESSAGES: Message[] = [];

export const STATIC_DASHBOARD: DashboardStats = {
  totalProjects: STATIC_PROJECTS.length,
  totalPosts: STATIC_POSTS.length,
  totalMessages: STATIC_MESSAGES.length,
  unreadMessages: STATIC_MESSAGES.filter((item) => !item.isRead).length,
};

export const STATIC_HOME: HomeData = {
  profile: STATIC_PROFILE,
  featuredProjects: STATIC_PROJECTS.filter((project) => project.featured),
  skills: STATIC_SKILLS_GROUPED,
  ...STATIC_SETTINGS,
};
