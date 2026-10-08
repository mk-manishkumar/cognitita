import chapter1Body from "../data/dsa-chapter-1.md?raw";
import chapter2Body from "../data/dsa-chapter-2.md?raw";

export const KEY = "cognitia-notes-v1";
const LEGACY_KEY = "margin-notes-v1";
export const day = 86400000;
const seed = [];

export const colorDot = { sage: "bg-[#91a38b]", blue: "bg-[#8ca5b6]", peach: "bg-[#c99c7c]", lilac: "bg-[#a99cbd]" };

const chapter1 = {
  id: "dsa-chapter-1",
  title: "Chapter - 1: What is DSA? + Time Complexity Explained",
  body: chapter1Body.trim(),
  subject: "DSA",
  color: "sage",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dueAt: new Date().toISOString(),
  interval: 1,
  reps: 0,
};

const chapter2 = {
  id: "dsa-chapter-2",
  title: "Chapter - 2: Space Complexity & Its Complexity Classes",
  body: chapter2Body.trim(),
  subject: "DSA",
  color: "blue",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dueAt: new Date().toISOString(),
  interval: 1,
  reps: 0,
};

const chapters = [chapter1, chapter2];

const demoTitles = new Set(["The spacing effect", "Binary search", "The Feynman technique", "HTTP status codes", "What is a document?", "Stack vs. queue"]);

export function ensureChapterOne(notes) {
  const cleaned = notes.filter(note => !demoTitles.has(note.title));
  const orderedChapters = chapters.map(chapter =>
    cleaned.find(note => note.id === chapter.id || note.title === chapter.title) || chapter
  );
  const otherNotes = cleaned
    .filter(note => !chapters.some(chapter => note.id === chapter.id || note.title === chapter.title))
    .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

  return [...orderedChapters, ...otherNotes];
}

export function getNotes() {
  try {
    const current = localStorage.getItem(KEY);
    if (current) return ensureChapterOne(JSON.parse(current));
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return ensureChapterOne(seed);
    const migrated = JSON.parse(legacy).map(note => ({
      ...note,
      subject: ["Learning", "Computer science", "Computer Science"].includes(note.subject) ? "DSA" : ["Web development", "Web Development"].includes(note.subject) ? "Backend from First Principles" : note.subject,
    }));
    return ensureChapterOne(migrated);
  } catch {
    return ensureChapterOne(seed);
  }
}

export function dateLabel(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

export function markdownExcerpt(value) {
  return value
    .replace(/```[\s\S]*?```/g, " Code example ")
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, "")
    .replace(/^\s*#{1,6}\s*/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\|/g, " · ")
    .replace(/^[-_]{3,}$/gm, "")
    .trim();
}
