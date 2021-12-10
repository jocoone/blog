import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../src/domain/Post";

const postsDirectory = path.join(process.cwd(), "posts");

interface PostParam {
  params: {
    id: string;
  };
}

export function getAllPostIds(): PostParam[] {
  return fs.readdirSync(postsDirectory).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    };
  });
}

export async function getAllPostsForTag(tag: string): Promise<Post[]> {
  return Promise.all(
    getAllPostIds().map(({ params: { id } }) => getPostData(id))
  ).then((posts: Post[]) => {
    return posts.filter(({ tags = [] }) => tags.includes(tag));
  });
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    content,
    ...data,
    title: data.title,
    date: data.date,
    author: data.author
  };
}
