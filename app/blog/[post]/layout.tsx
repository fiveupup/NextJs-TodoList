import { Interface } from "readline";

const BlogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

interface ParamsType {
  post: string;
}

export default BlogLayout;

export async function generateMetadata({params} : Readonly<{params: ParamsType}>) {
  return {
    title: params.post.split("-").join(" "),
  };
}
