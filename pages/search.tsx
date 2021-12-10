import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsForTag } from "../lib/posts";
import Date from "../src/components/Date";
import Head from "../src/components/Head";
import Layout from "../src/components/Layout";
import Tag from "../src/components/Tag";
import { Post } from "../src/domain/Post";
import baseStyles from "../styles/Base.module.scss";
import searchStyles from "../styles/Search.module.scss";
import { profilePictureLoader } from "../lib/image";

interface Props {
  tag: string;
  posts: Post[];
}

const Search: React.FunctionComponent<Props> = ({ tag, posts }) => {
  return (
    <Layout>
      <Head
        title="Search"
        description="Content blog completely open source deployed on Vercel"
      />
      <section className={baseStyles.main}>
        <h3>
          Search for tag: <Tag tag={tag}>{tag}</Tag>
        </h3>
        {posts.length === 0 ? (
          <div>
            No posts found with tag <Tag tag={tag}>{tag}</Tag>
          </div>
        ) : (
          <div className={searchStyles.search}>
            {posts.map((post) => (
              <div key={post.title} className={searchStyles.post}>
                <h3>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h3>
                <div className={searchStyles.author}>
                  {post.profile ? (
                    <div className={searchStyles.author__picture}>
                      <Image
                        loader={profilePictureLoader}
                        src={`/api/image?url=${post.profile}`}
                        height={40}
                        width={40}
                        alt="profile"
                      />
                    </div>
                  ) : null}
                  {post.author}
                </div>
                <Date date={post.date} />
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { tag = "" } = context.query;
  const matchingPosts = await getAllPostsForTag(tag);

  return {
    props: {
      tag,
      posts: matchingPosts
    }
  };
}

export default Search;
