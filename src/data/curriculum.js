export const curriculum = [
  {
    id: "computer-science",
    name: "Computer Science",
    path: "/computer-science",
    description: "Build a strong foundation, one idea at a time.",
    icon: "code",
    groups: [
      {
        id: "core-subjects",
        name: "Core Subjects",
        description: "The fundamentals behind how software works.",
        topics: [
          { id: "dsa", name: "DSA", group: "Core Subjects", path: "/computer-science/dsa", description: "Data structures, algorithms, and problem solving.", color: "sage" },
        ],
      },
      {
        id: "web-development",
        name: "Web Development",
        description: "Explore the tools and ideas behind the web.",
        topics: [
          { id: "mongodb", name: "MongoDB", group: "Web Development", path: "/computer-science/mongodb", description: "Flexible data models and document databases.", color: "blue" },
          { id: "backend-from-first-principles", name: "Backend from First Principles", group: "Web Development", path: "/computer-science/backend-from-first-principles", description: "Understand what happens behind every request.", color: "peach" },
          { id: "nodejs-expressjs", name: "NodeJS and ExpressJS", group: "Web Development", path: "/computer-science/nodejs-expressjs", description: "Build backend applications with Node.js and Express.js.", color: "sage" },
        ],
      },
    ],
  },
];

export const topics = curriculum.flatMap(subject => subject.groups.flatMap(group => group.topics));
export const findTopic = id => topics.find(topic => topic.id === id);
