// ✦ Edit everything about you in this one file. ✦

export const profile = {
  name: "Nohelis Rangel",
  initials: "NR",
  role: "Junior Software Developer / UI/UX Designer",
  tagline: "Building interfaces, written in the stars.",
  intro:
    "Full-stack and mobile developer with real-world UI/UX design experience, based in Waterloo, Ontario. I design in Figma and build with React, TypeScript, Flutter and ASP.NET Core, turning complex ideas into intuitive, accessible experiences.",
  email: "nlisrangel04@gmail.com",
  github: "https://github.com/NohelisRangel",
  linkedin: "https://www.linkedin.com/in/nohelis-rangel-835137375",
  resume: "/resume.pdf",
  photo: "/me.jpg",
};

export const aboutIntro =
  "A creative mind, a developer’s curiosity, and a belief that good interfaces should feel effortless.";

export const facets = [
  {
    key: "sun",
    label: "Aquarius Sun",
    eyebrow: "What I do",
    title: "The Futuristic Innovator",
    text: "I design and build responsive UIs, RESTful APIs and cross-platform mobile apps, balancing visual detail, accessibility and thoughtful interaction.",
  },
  {
    key: "moon",
    label: "Taurus Moon",
    eyebrow: "What drives me",
    title: "The Grounded Craftsman",
    text: "I’m drawn to the space where logic meets imagination — and the small details that make a product feel human.",
  },
  {
    key: "rising",
    label: "Aries Rising",
    eyebrow: "How I collaborate",
    title: "The Energetic Trailblazer",
    text: "I’ve led a dev team through an Agile sprint and worked side by side with developers so design intent carries through to the final build.",
  },
];

// Each constellation: stars positioned in a 0–100 coordinate box, with lines between star indexes.
export const constellations = [
  {
    name: "Frontend & Mobile",
    caption: "Ideas into interfaces",
    stars: [
      { label: "React", x: 10, y: 48 },
      { label: "TypeScript", x: 40, y: 18 },
      { label: "Flutter & Dart", x: 82, y: 40 },
      { label: "HTML & CSS", x: 22, y: 86 },
      { label: "Tailwind CSS", x: 60, y: 82 },
    ],
    lines: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [1, 4]],
  },
  {
    name: "Backend & Data",
    caption: "The logic underneath",
    stars: [
      { label: "ASP.NET Core", x: 12, y: 40 },
      { label: "Node.js & Express", x: 78, y: 14 },
      { label: "REST APIs", x: 50, y: 50 },
      { label: "SQL & MongoDB", x: 20, y: 86 },
      { label: "Python & ML", x: 74, y: 88 },
    ],
    lines: [[0, 2], [2, 1], [2, 3], [3, 4], [4, 2]],
  },
  {
    name: "Design & Tools",
    caption: "A thoughtful toolkit",
    stars: [
      { label: "Figma", x: 14, y: 22 },
      { label: "Git & GitHub", x: 82, y: 26 },
      { label: "Prototyping", x: 50, y: 52 },
      { label: "Agile / Scrum", x: 18, y: 84 },
      { label: "Claude Code", x: 76, y: 86 },
    ],
    lines: [[0, 2], [2, 1], [2, 3], [2, 4], [1, 4]],
  },
];

// The Houses — your projects. `preview` controls the little mock screen on each card.
// Add `demo: "https://..."` or `source: "https://github.com/..."` to show those links on a card.
export const projects = [
  { name: "Global Recipe App", glyph: "♈\uFE0E",
    desc: "A cross-platform iOS/Android recipe app with live API data, offline storage and step-by-step cooking timers. I led the team as Project Lead through a 4-week sprint.",
    tags: ["Flutter", "Dart", "SQLite", "REST API"],
    preview: { bg: "#D9CDB8", kind: "timer", headline: "Cook it, step by step." } },
  { name: "Fashion Social Platform", glyph: "♉\uFE0E",
    desc: "A full-stack community for sharing fashion posts, with role-based auth, full CRUD and an admin panel for moderation and analytics.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    preview: { bg: "#CFC4E0", kind: "gallery", headline: "Style, shared." } },
  { name: "Subscription Predictor", glyph: "♊\uFE0E",
    desc: "A machine-learning comparison of five models on 45,211 bank-marketing records. I owned the tuned Random Forest, which ranked among the top on ROC-AUC.",
    tags: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
    preview: { bg: "#C3D0CF", kind: "system", headline: "Who will say yes?" } },
  { name: "Festivals & Events App", glyph: "♋\uFE0E",
    desc: "UI/UX design for a festivals and events mobile app at Exposoft Solutions: user flows, wireframes and high-fidelity mockups.",
    tags: ["Figma", "UI/UX", "Prototyping"],
    preview: { bg: "#C8D3C4", kind: "events", headline: "Good things, happening." } },
  { name: "Marketing Websites", glyph: "♌\uFE0E",
    desc: "Marketing websites designed and built end to end at Exposoft Solutions, turning brand and campaign goals into responsive, polished layouts.",
    tags: ["Web Design", "Responsive", "Figma"],
    preview: { bg: "#C4C3DC", kind: "landscape", headline: "Made to be noticed." } },
];

export const experience = [
  {
    title: "UI/UX Designer",
    org: "Exposoft Solutions · Waterloo, Ontario",
    dates: "May — Sep 2026",
    text: "Designed and built marketing websites end to end, and helped design a festivals and events mobile app with user flows, wireframes and high-fidelity Figma mockups. Worked with developers so design intent carried through to the final build.",
  },
  {
    title: "Project Lead, Global Recipe App",
    org: "Team project · Conestoga College",
    dates: "4-week sprint",
    text: "Led the development team through an Agile sprint: coordinated tasks, cleared blockers, managed Git workflows across a multi-developer codebase and delivered on schedule.",
  },
  {
    title: "Computer Programming Diploma",
    org: "Conestoga College · Waterloo, Ontario",
    dates: "Education",
    text: "Coursework in OOP, data structures and algorithms, web and mobile development, databases, software testing, systems analysis and design, and data analytics, AI and machine learning.",
  },
];
