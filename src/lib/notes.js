import { topics } from "../data/curriculum.js";

const markdownFiles = import.meta.glob("../data/Computer Science/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const colorDot = { sage: "bg-[#91a38b]", blue: "bg-[#8ca5b6]", peach: "bg-[#c99c7c]", lilac: "bg-[#a99cbd]" };

function noteFromMarkdown(path, body) {
  const parts = path.split("/");
  const fileName = parts.at(-1);
  const subject = parts.at(-2);
  const chapter = fileName.match(/^chapter-(\d+)\.md$/i)?.[1];
  const headingLine = marker => body.split("\n").find(line => line.startsWith(`${marker} `));
  const mainHeading = headingLine("#")?.slice(2).trim();
  const subtitle = headingLine("##")?.slice(3).trim();
  const startsWithNumberedSection = subtitle && subtitle.length > 2 && subtitle[0] >= "0" && subtitle[0] <= "9" && subtitle[1] === ".";
  let titleHeading = mainHeading;
  if (chapter && !startsWithNumberedSection) titleHeading = subtitle || mainHeading;
  let title = titleHeading || fileName.replace(/\.md$/i, "");
  const chapterHeading = titleHeading || `Chapter ${chapter}`;
  if (chapter) title = `Chapter - ${chapter}: ${chapterHeading}`;
  const topic = topics.find(item => item.name === subject);

  return {
    id: path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase(),
    title,
    body: body.trim(),
    subject,
    color: topic?.color || "sage",
    sourcePath: path.replace("../data/", "src/data/"),
  };
}

export function getNotes() {
  return Object.entries(markdownFiles)
    .map(([path, body]) => noteFromMarkdown(path, body))
    .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath, undefined, { numeric: true }));
}

export function markdownExcerpt(value) {
  return value
    .replace(/```[\s\S]*?```/g, " Code example ")
    .split("\n")
    .map(line => {
      let text = line.trimStart();
      const separatorText = text.replaceAll("|", "").replaceAll(":", "").replaceAll("-", "").replaceAll("_", "").trim();
      if (separatorText === "" && (text.includes("-") || text.includes("_"))) return "";
      if (text.startsWith("#")) {
        let headingMarks = 0;
        while (text[headingMarks] === "#" && headingMarks < 6) headingMarks += 1;
        if (text[headingMarks] === " ") text = text.slice(headingMarks + 1);
      }
      if (text.startsWith(">")) text = text.slice(1).trimStart();
      if (["-", "*", "+"].includes(text[0]) && text[1] === " ") text = text.slice(2);
      let numberEnd = 0;
      while (numberEnd < text.length && text[numberEnd] >= "0" && text[numberEnd] <= "9") numberEnd += 1;
      if (numberEnd > 0 && text[numberEnd] === "." && text[numberEnd + 1] === " ") {
        text = text.slice(numberEnd + 2);
      }
      return text;
    })
    .join("\n")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replaceAll("|", " · ")
    .trim();
}
