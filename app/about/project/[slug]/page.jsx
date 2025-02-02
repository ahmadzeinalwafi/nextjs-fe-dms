import { compileMDX } from 'next-mdx-remote/rsc'
import * as React from "react"
import fs from "fs";
import path from "path";
import { useMDXComponents } from "@/mdx-components";
import SideMenuWhitePaper from '@/app/_components/SideMenuWhitePaper';

export default async function WhitePaper({params}) {
  // Optionally provide a type for your frontmatter object
  const awaitedParams = await params; // ✅ Ensure `params` is resolved before accessing properties
  const slug = awaitedParams?.slug; 

  const filePath = path.join(process.cwd(), "docs/project", `${slug}.md`);
  const components = useMDXComponents({});

  if (!fs.existsSync(filePath)) {
      console.error("⚠️ MDX file not found:", filePath);
      return null;
    }
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const {content, _} = await compileMDX({
    source: fileContents,
  })

  return (
    <div className="flex h-screen">
      <SideMenuWhitePaper/>
      <div className="flex-1 bg-gray-900 text-white overflow-y-auto ">
        <div className='px-56 text-justify indent-10 py-6'>
          {React.cloneElement(content, { components })}
        </div>
      </div>
    </div>
  )
}