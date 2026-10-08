import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ children }) => <h1 className="mb-4 mt-7 font-serif text-3xl leading-tight text-[#30352e]">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-3 mt-7 border-b border-[#e9eae4] pb-2 font-serif text-2xl leading-tight text-[#3d443a]">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-5 font-serif text-lg text-[#475044]">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 mt-4 text-sm font-semibold text-[#596452]">{children}</h4>,
  p: ({ children }) => <p className="mb-3 text-[13px] leading-7 text-[#666d62]">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[13px] leading-6 text-[#666d62] marker:text-[#819477]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-[13px] leading-6 text-[#666d62] marker:font-semibold marker:text-[#819477]">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[#465243]">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="my-5 border-l-2 border-[#9aaa8e] bg-[#f6f8f3] py-2 pl-4 pr-3 text-[#66715f]">{children}</blockquote>,
  hr: () => <hr className="my-6 border-[#e9eae4]"/>,
  code: ({ children, className }) => <code className={`${className ? "block" : "inline-block"} rounded-md bg-[#f2f4ef] px-1.5 py-0.5 font-mono text-[11px] text-[#53664f]`}>{children}</code>,
  pre: ({ children }) => <pre className="my-4 overflow-x-auto rounded-xl bg-[#293329] p-4 text-[11px] leading-6 text-[#edf1e9] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">{children}</pre>,
  table: ({ children }) => <div className="my-5 overflow-x-auto rounded-lg border border-[#e7eae3]"><table className="w-full border-collapse text-left text-xs">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-[#f1f4ee] text-[#58634f]">{children}</thead>,
  th: ({ children }) => <th className="border-b border-[#e4e8df] px-3 py-2.5 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-[#edf0e9] px-3 py-2.5 text-[#697065]">{children}</td>,
  a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="text-[#63795f] underline decoration-[#c5d0bd] underline-offset-2">{children}</a>,
};

export function MarkdownContent({ content, className = "" }) {
  return <div className={`min-w-0 ${className}`}><ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</ReactMarkdown></div>;
}
