import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownResult } from "../utils";

export const AppMarkdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          }
          if (!href.startsWith("/")) {
            return <a {...props} href={href} rel="noopener noreferrer"></a>;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    ></MDXRemote>
  );
};
