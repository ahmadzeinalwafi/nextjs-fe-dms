"use client";
import Docs from "./docs.md";
import SideMenuWhitePaper from "@/app/_components/SideMenuWhitePaper";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";

export default function Project() {
  const components = useMDXComponents({});
  return (
    <div className="flex h-screen">
      <SideMenuWhitePaper />
      {/* Main Content */}
      <div className="flex-1 bg-gray-900 text-white overflow-y-auto px-56">
        <MDXProvider components={components}>
          <div className="text-justify indent-10 my-5">
            <Docs />
          </div>
        </MDXProvider>
      </div>
    </div>
  );
}
