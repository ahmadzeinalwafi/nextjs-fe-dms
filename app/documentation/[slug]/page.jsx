"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import SideMenuDocumentation from "@/app/_components/SideMenuDocumentation";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function Documentation() {
  const { slug } = useParams();

  const Docs = dynamic(
    () =>
      import(`@/docs/documentation/${slug}.md`).catch(() => {
        notFound();
      }),
    { ssr: false }
  );

  const components = useMDXComponents({});

  return (
    <div className="flex h-screen">
      <SideMenuDocumentation />
      {/* Main Content */}
      <div className="flex-1 bg-gray-900 text-white overflow-y-auto px-56">
        <Suspense fallback={<div>Loading...</div>}>
          <MDXProvider components={components}>
            <div className="text-justify indent-10 my-5">
              <Docs />
            </div>
          </MDXProvider>
        </Suspense>
      </div>
    </div>
  );
}
