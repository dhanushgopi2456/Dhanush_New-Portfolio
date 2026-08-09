export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'language' | 'aiml' | 'tools' | 'soft';
  level: number; // percentage 0-100
  icon: string;
  description: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'Full Stack' | 'MERN' | 'AI / Computer Vision';
  description: string;
  spokenSummary?: string;
  bulletPoints: string[];
  techStack: string[];
  repoUrl: string;
  demoUrl?: string;
  featured: boolean;
  image: string;
  mockType: 'ecommerce' | 'kanban' | 'yolo';
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tech: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  score: string;
  period: string;
  favoriteCourses: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badgeCode: string;
  iconName: string;
  verifyUrl: string;
  githubCertUrl: string;
  skillsValidated: string[];
}

export interface CodingProfile {
  id: string;
  platform: string;
  username: string;
  profileUrl: string;
  solvedCount: string;
  ratingOrRank: string;
  badge: string;
  color: string;
  iconName: string;
  highlights: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  period: string;
  description: string;
  tag: string;
  details?: string[];
}

export const RESUME_DATA = {
  personal: {
    name: "Dhanush Gopi Kavala",
    shortName: "Dhanush",
    role: "Full Stack & MERN Software Engineer",
    subRole: "AI / Machine Learning & Computer Vision Enthusiast",
    email: "gopidhanush615@gmail.com",
    phone: "+91-6281716735",
    location: "Tadepalligudem, Andhra Pradesh, India",
    github: "https://github.com/dhanushgopi2456",
    linkedin: "https://www.linkedin.com/in/dhanush-gopi-kavala",
    portfolio: "https://harinew-portfolio-33.vercel.app/",
    careerObjective: "To leverage my technical foundation in Full Stack MERN Development, Data Structures, and AI to build scalable, high-performance web applications that solve real-world problems while driving technological innovation.",
    summary: "Results-driven Computer Science Graduate and Software Engineer specializing in Full Stack Development and the MERN Stack. Proficient in building scalable web applications and robust REST APIs using React.js, Node.js, Express.js, MongoDB, Java, and Python. Adept at problem solving with 900+ algorithmic problems solved across LeetCode, GeeksforGeeks, and Code360 to optimize system performance.",
    stats: [
      { label: "B.Tech CGPA", value: "9.04", sub: "Top Academic Rank (82.88%)" },
      { label: "Problems Solved", value: "900+", sub: "LeetCode, GFG, Code360" },
      { label: "Certifications", value: "6", sub: "ServiceNow, Oracle, Azure, Salesforce" },
      { label: "Research Paper", value: "AIDE-2024", sub: "Published IEEE Conference" }
    ]
  },

  codingProfiles: [
    {
      id: "leetcode",
      platform: "LeetCode",
      username: "Dhanush_Gopi",
      profileUrl: "https://leetcode.com/u/Dhanush_Gopi/",
      solvedCount: "500+ Solved",
      ratingOrRank: "Contest Rating: 1550+",
      badge: "50+ Days Streak Badge",
      color: "from-amber-500 to-orange-600",
      iconName: "Code2",
      highlights: ["Data Structures & Algorithms in Java/C++", "Arrays, Linked Lists, Trees, Graphs, DP", "Top 20% in Weekly Contests"]
    },
    {
      id: "gfg",
      platform: "GeeksforGeeks (GFG)",
      username: "gopidhan1xwf",
      profileUrl: "https://www.geeksforgeeks.org/profile/gopidhan1xwf",
      solvedCount: "250+ Solved",
      ratingOrRank: "Score: 680+",
      badge: "Institute Top Contender",
      color: "from-emerald-500 to-green-600",
      iconName: "Binary",
      highlights: ["Problem of the Day Streaks", "Core Java & DSA Solutions", "System Design & OOP Foundations"]
    },
    {
      id: "code360",
      platform: "Code Studio (CodeNinja 360)",
      username: "codewithdhanush",
      profileUrl: "https://www.naukri.com/code360/profile/codewithdhanush",
      solvedCount: "150+ Solved",
      ratingOrRank: "Ninja Specialist",
      badge: "Master in Core Java DSA",
      color: "from-blue-500 to-indigo-600",
      iconName: "Cpu",
      highlights: ["Guided Path Solutions", "Topic-wise Problem Mastery", "Mock Technical Interview Prep"]
    },
    {
      id: "codolio",
      platform: "Codolio Aggregator",
      username: "codewithdnush",
      profileUrl: "https://codolio.com/profile/codewithdnush",
      solvedCount: "900+ Unified Solved",
      ratingOrRank: "Verified Dev Card",
      badge: "Multi-Platform Developer",
      color: "from-purple-500 to-pink-600",
      iconName: "Sparkles",
      highlights: ["Unified Coding Performance Metrics across platforms", "Centralized Problem Solving Stats (900+ Solved)", "Activity Heatmap Track"]
    }
  ] as CodingProfile[],

  skills: [
    // Frontend
    { name: "React.js", category: "frontend", level: 95, icon: "Atom", description: "State hooks, context, custom hooks, reusable UI architectures, Vite integration", featured: true },
    { name: "Tailwind CSS", category: "frontend", level: 92, icon: "Palette", description: "Utility-first responsive layouts, glassmorphism, dynamic themes, dark mode", featured: true },
    { name: "JavaScript (ES6+)", category: "frontend", level: 92, icon: "Code2", description: "Promises, Async/Await, DOM manipulation, ES modules, functional patterns", featured: true },
    { name: "Vite", category: "frontend", level: 90, icon: "Zap", description: "Modern lightning-fast build tooling, HMR, asset optimization", featured: false },
    { name: "HTML5 / CSS3", category: "frontend", level: 95, icon: "Layout", description: "Semantic markup, Flexbox, Grid, custom keyframe animations", featured: false },

    // Backend
    { name: "Node.js", category: "backend", level: 90, icon: "Server", description: "Event-driven asynchronous backend runtime, NPM packages, CLI apps", featured: true },
    { name: "Express.js", category: "backend", level: 92, icon: "Cpu", description: "RESTful routing, custom middleware, error handling, MVC architecture", featured: true },
    { name: "JWT Auth", category: "backend", level: 90, icon: "ShieldCheck", description: "Role-Based Access Control (RBAC), token verification, secure sessions", featured: true },
    { name: "Spring Boot", category: "backend", level: 78, icon: "Layers", description: "Java web service basics, Spring MVC, REST controllers", featured: false },
    { name: "Flask", category: "backend", level: 85, icon: "Flame", description: "Lightweight Python web framework for ML model inference and REST APIs", featured: false },

    // Databases
    { name: "MongoDB", category: "database", level: 90, icon: "Database", description: "Document-oriented NoSQL database, indexing, aggregation pipelines", featured: true },
    { name: "Mongoose", category: "database", level: 92, icon: "Workflow", description: "Schema validation, population, document hooks, ORM modeling", featured: true },
    { name: "MySQL", category: "database", level: 85, icon: "Table", description: "Relational queries, ACID compliance, normalization, complex JOINs", featured: false },

    // Languages
    { name: "Core Java", category: "language", level: 92, icon: "Coffee", description: "Data Structures & Algorithms, OOP principles, Collections, Threads", featured: true },
    { name: "Python", category: "language", level: 90, icon: "Terminal", description: "PyTorch pipelines, OpenCV image processing, NumPy data manipulation", featured: true },
    { name: "C++", category: "language", level: 84, icon: "Binary", description: "Standard Template Library (STL), memory pointers, problem solving", featured: false },
    { name: "DSA", category: "language", level: 92, icon: "GitGraph", description: "Trees, Graphs, DP, Sorting, Searching, Greedy Algorithms", featured: true },

    // AI / ML
    { name: "YOLOv9 Vision", category: "aiml", level: 90, icon: "Eye", description: "Real-time object detection models, custom dataset training & benchmarking", featured: true },
    { name: "PyTorch", category: "aiml", level: 85, icon: "Activity", description: "Deep learning tensor operations, neural network training loops", featured: true },
    { name: "OpenCV & NumPy", category: "aiml", level: 88, icon: "Image", description: "Image filtering, bounding box rendering, video frame processing", featured: false },

    // Tools & Soft
    { name: "Git & GitHub", category: "tools", level: 92, icon: "GitBranch", description: "Branching strategies, pull requests, version control, commit conventions", featured: true },
    { name: "Postman", category: "tools", level: 90, icon: "Send", description: "API collection design, environment variables, authentication testing", featured: false },
    { name: "CI/CD & DevOps", category: "tools", level: 82, icon: "Cloud", description: "Vercel deployments, automated build scripts, environment secrets", featured: false },
    { name: "Leadership", category: "soft", level: 95, icon: "Users", description: "Class Representative leading 60+ students, academic liaising", featured: true }
  ] as Skill[],

  experience: [
    {
      company: "Codec Technologies Pvt. Ltd.",
      role: "MERN Stack Developer",
      location: "Remote",
      period: "Jan 2026 - Mar 2026",
      bullets: [
        "Engineered and deployed scalable web applications using the MERN Stack (React.js, Node.js, Express.js, MongoDB) and Tailwind CSS, optimizing rendering performance and frontend load times.",
        "Designed secure RESTful APIs with JWT Authentication and managed version control using Git/GitHub under Agile methodologies, ensuring robust multi-user system operations.",
        "Created custom Express middleware for request token verification, error handling, and payload sanitization across production endpoints.",
        "Participated in daily Agile sprint standups, code reviews, and Git feature branching workflows to deliver clean production code."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT Auth", "REST APIs", "Git / GitHub", "Postman"]
    }
  ] as Experience[],

  projects: [
    {
      id: "freshmart",
      title: "FreshMart Full-Stack Grocery Web App",
      subtitle: "E-Commerce Ecosystem with Admin Control Panel",
      date: "Jan 2026 - Feb 2026",
      category: "MERN",
      description: "A complete, production-ready full-stack grocery e-commerce web platform. Features JWT authentication, dynamic cart management, interactive search & filter, order processing, and an admin panel for full inventory control.",
      spokenSummary: "FreshMart is a full-stack MERN grocery e-commerce app featuring JWT authentication and dynamic cart management. It connects a responsive React frontend with Express and MongoDB REST APIs for complete online store management.",
      bulletPoints: [
        "Developed a full-stack e-commerce web application with JWT Authentication, a responsive React frontend, and an integrated admin dashboard for complete inventory control.",
        "Designed and deployed modular, scalable RESTful APIs using Node.js, Express, and MongoDB/Mongoose to orchestrate secure user, product, and cart management workflows."
      ],
      techStack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "Tailwind CSS"],
      repoUrl: "https://github.com/dhanushgopi2456/FreshMart",
      demoUrl: "https://freshmart-demo.vercel.app",
      featured: true,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      mockType: "ecommerce"
    },
    {
      id: "taskmanager",
      title: "Team Task Manager",
      subtitle: "Collaborative Board with Role-Based Access Control",
      date: "Dec 2024 - Jan 2025",
      category: "Full Stack",
      description: "Architected a collaborative task management application built on MVC architecture with JWT-based Role-Based Access Controls (RBAC), real-time status updates, and custom Mongoose schemas.",
      spokenSummary: "Team Task Manager is a collaborative Agile project board featuring role-based access control and live task tracking. Built with React and Express, it provides secure multi-user workflows with Mongoose schema validation.",
      bulletPoints: [
        "Architected a collaborative, multi-user task management system featuring JWT-based Role-Based Access Controls (RBAC) and a modular backend based on MVC architecture.",
        "Designed a highly responsive UI with React.js and Tailwind CSS, integrating real-time state updates, custom filters, and robust Mongoose schemas."
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "Tailwind CSS"],
      repoUrl: "https://github.com/dhanushgopi2456/Team-Task-Manager",
      demoUrl: "https://team-task-manager-demo.vercel.app",
      featured: true,
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800",
      mockType: "kanban"
    },
    {
      id: "yolov9",
      title: "Object Detection using YOLO-v9",
      subtitle: "Real-Time AI Vision Pipeline & Flask Media Inference",
      date: "Apr 2024 - Aug 2024",
      category: "AI / Computer Vision",
      description: "End-to-end computer vision pipeline using YOLOv9 trained with PyTorch and OpenCV. Deployed as a high-performance Flask web app capable of performing real-time object detection on uploaded video and image streams.",
      spokenSummary: "YOLO-v9 Object Detection is a deep learning computer vision system trained with PyTorch and OpenCV. Published in IEEE AIDE 2024, it performs real-time bounding box media inference served via Flask.",
      bulletPoints: [
        "Engineered an end-to-end computer vision pipeline using YOLOv9 with PyTorch, NumPy, and OpenCV to perform real-time custom model training and benchmarking.",
        "Deployed the trained deep learning model as a high-performance Flask web application for seamless upload and real-time inference on live media files."
      ],
      techStack: ["Python", "PyTorch", "OpenCV", "NumPy", "Flask", "YOLOv9", "Deep Learning"],
      repoUrl: "https://github.com/dhanushgopi2456/Object-Detection-YOLO-v9",
      demoUrl: "https://yolov9-demo.vercel.app",
      featured: true,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      mockType: "yolo"
    }
  ] as Project[],

  education: [
    {
      institution: "Sri Vasavi Engineering College",
      location: "Tadepalligudem, India",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      score: "CGPA: 9.04/10 (82.88%)",
      period: "Nov 2022 - July 2026",
      favoriteCourses: ["Object Oriented Programming", "Data Structures & Algorithms", "DBMS", "MERN Full Stack", "Computer Networks", "Operating Systems"]
    },
    {
      institution: "Sri Chaitanya Junior College",
      location: "Tadepalligudem, India",
      degree: "Intermediate (Senior Secondary - MPC)",
      score: "Percentage: 96%",
      period: "June 2020 - March 2022",
      favoriteCourses: ["Mathematics (A & B)", "Physics", "Chemistry", "Computer Science"]
    },
    {
      institution: "Sri Shiridi Sai EM High School",
      location: "Tadepalligudem, India",
      degree: "Matriculation (Secondary Education)",
      score: "Percentage: 99%",
      period: "March 2020",
      favoriteCourses: ["Mathematics", "Physical Science", "Natural Science", "English"]
    }
  ] as Education[],

  certifications: [
    {
      title: "Agentforce Specialist",
      issuer: "Salesforce",
      date: "Dec 2025",
      badgeCode: "SF-AGENT-2025",
      iconName: "Cloud",
      verifyUrl: "https://trailhead.salesforce.com/credentials/verification",
      githubCertUrl: "https://github.com/dhanushgopi2456/My_Certifications/blob/main/Salesforce%20Certified%20AgentForce%20Specialist.pdf",
      skillsValidated: ["Salesforce AI Agents", "Autonomous Workflow Automation", "Prompt Builder", "CRM Data Integration"]
    },
    {
      title: "Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      date: "Sep 2025",
      badgeCode: "SN-CSA-2025",
      iconName: "Shield",
      verifyUrl: "https://partnerportal.servicenow.com",
      githubCertUrl: "https://github.com/dhanushgopi2456/My_Certifications/blob/main/ServiceNowCIS.pdf",
      skillsValidated: ["ServiceNow Platform Admin", "User & Role Management", "Workflow Automation", "ITSM Configuration"]
    },
    {
      title: "Certified Application Developer (CAD)",
      issuer: "ServiceNow",
      date: "Oct 2025",
      badgeCode: "SN-CAD-2025",
      iconName: "Code",
      verifyUrl: "https://partnerportal.servicenow.com",
      githubCertUrl: "https://github.com/dhanushgopi2456/My_Certifications/blob/main/ServiceNowCAD.pdf",
      skillsValidated: ["Scripting in ServiceNow", "GlideRecord APIs", "Custom App Engine", "Client/Server Scripts"]
    },
    {
      title: "Cloud Infrastructure 2025 DevOps Professional",
      issuer: "Oracle",
      date: "July 2025",
      badgeCode: "OCI-DEVOPS-2025",
      iconName: "Server",
      verifyUrl: "https://mylearn.oracle.com",
      githubCertUrl: "https://github.com/dhanushgopi2456/My_Certifications/blob/main/Oracle_Devops_Certificate.pdf",
      skillsValidated: ["CI/CD Pipelines", "Container Engine (OKE)", "Infrastructure as Code", "Oracle Cloud Security"]
    },
    {
      title: "Azure AI Fundamentals (AI-900)",
      issuer: "Microsoft",
      date: "May 2024",
      badgeCode: "MSFT-AI900-2024",
      iconName: "Cpu",
      verifyUrl: "https://learn.microsoft.com/credentials",
      githubCertUrl: "https://github.com/dhanushgopi2456/My_Certifications/blob/main/Azure%20Ai%20fundamentals%20%20Global%20Certificate%20by%20Microsoft.pdf",
      skillsValidated: ["Machine Learning Workloads", "Computer Vision Concepts", "NLP Principles", "Responsible AI"]
    },
    {
      title: "Data Structures & Algorithms using Java",
      issuer: "NPTEL",
      date: "Oct 2024",
      badgeCode: "NPTEL-DSA-JAVA",
      iconName: "CheckCircle",
      verifyUrl: "https://nptel.ac.in/noc",
      githubCertUrl: "https://github.com/dhanushgopi2456/My_Certifications/blob/main/Data%20Structure%20and%20Algorithms%20using%20Java%20.pdf",
      skillsValidated: ["Algorithm Time & Space Complexity", "Trees & Graph Traversals", "Dynamic Programming", "Java Collections Framework"]
    }
  ] as Certification[],

  achievements: [
    {
      title: "Published Research Paper on Object Detection using YOLOv9",
      organization: "International Conference on Artificial Intelligence and Data Science (AIDE-2024)",
      period: "2024",
      description: "Co-authored and published IEEE-format research paper detailing computer vision optimization and real-time custom model training.",
      tag: "Research Paper",
      details: [
        "benchmarked YOLOv9 against YOLOv8 & Faster R-CNN for speed and mAP",
        "Trained model on custom datasets using PyTorch & OpenCV with Flask deployment",
        "Presented paper virtually to international panel of computer vision researchers"
      ]
    },
    {
      title: "Class Representative (Leading 60+ Students)",
      organization: "Sri Vasavi Engineering College",
      period: "Jan 2023 - Jan 2026",
      description: "Elected to lead a cohort of 60+ computer science students, managing academic scheduling, faculty liaison, and technical workshops.",
      tag: "Leadership",
      details: [
        "Liaised between 60+ students and CSE department faculty for academic planning",
        "Organized student peer-coding study circles and MERN stack workshops",
        "Managed student feedback and attendance operations with zero escalation"
      ]
    },
    {
      title: "Anti-Ragging and Student Welfare Committee Member",
      organization: "Sri Vasavi Engineering College",
      period: "Aug 2024 - Jan 2026",
      description: "Promoted an inclusive, harassment-free campus environment and actively managed student welfare measures.",
      tag: "Responsibility",
      details: [
        "Promoted strict anti-ragging policies across college departments",
        "Mentored junior CSE students for smooth transition into campus life",
        "Coordinated with college management on student safety guidelines"
      ]
    }
  ] as Achievement[]
};
