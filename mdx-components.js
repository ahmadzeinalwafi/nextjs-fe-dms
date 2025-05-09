export function useMDXComponents(components) {
  return {
    // Pass down any custom components or default MDX components
    ...components,

    // Custom styles for Markdown tags
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-800 text-center">{children}</h1>
    ),
    h2: ({ children }) => {
      let headingText = "";

      if (typeof children === "string") {
        headingText = children;
      } else if (Array.isArray(children)) {
        headingText = children.map((child) =>
          typeof child === "string" ? child : ""
        ).join("");
      }

      console.log("Heading:", headingText); // Debugging output

      const headingId = headingText
        .trim() // Remove leading/trailing spaces
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ""); // Remove special characters

      return (
        <h2 id={headingId} className="text-3xl font-semibold text-gray-700 my-3">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-gray-600 my-2 text-center">{children}</h3>
    ),
    p: ({ children }) => (
      <div className="text-base text-gray-700 my-5 leading-relaxed text-justify indent-10">
        <p>
          {children}
        </p>
      </div>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 text-gray-700">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <div id="no-indent">
        <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      </div>

    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto my-4">
        {children}
      </pre>
    ),
  };
}
