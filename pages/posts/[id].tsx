import React from "react";
import Image from "next/image";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGithub from "remark-github";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "../../src/components/Head";
import Layout from "../../src/components/Layout";
import Date from "../../src/components/Date";
import MyLink from "../../src/components/Link";
import MyImage from "../../src/components/Image";
import { Post } from "../../src/domain/Post";

import articleStyles from "../../styles/Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Tag from "../../src/components/Tag";
import { profilePictureLoader } from "../../lib/image";

const processor = unified()
  .use(remarkParse)
  .use(remarkGithub, { repository: "rehypejs/rehype-react" })
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: MyLink,
      img: MyImage
    }
  });

interface Props {
  post: Post;
}

const Post: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <Layout>
      <Head title={post.title}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/atom-one-light.min.css"
        />
      </Head>
      <article className={articleStyles.article}>
        <h1>{post.title}</h1>
        <div className={articleStyles.info}>
          <div className={articleStyles.author__date}>
            {post.profile ? (
              <div className={articleStyles.profile__picture}>
                <Image
                  loader={profilePictureLoader}
                  src={`/api/image?url=${post.profile}`}
                  height={40}
                  width={40}
                  alt="profile"
                />
              </div>
            ) : null}
            <b className={articleStyles.author}>{post.author}</b>
            <Date date={post.date} />
          </div>
          {post.twitter ? (
            <div className={articleStyles.twitter}>
              <a
                target="_blank"
                rel="noreferrer"
                href={"https://twitter.com/" + post.twitter}
              >
                @{post.twitter.toLowerCase()}
              </a>
              <FontAwesomeIcon
                icon={faTwitter}
                className={articleStyles.twitter__icon}
              />
            </div>
          ) : null}
        </div>
        {post.tags?.length ? (
          <div className={articleStyles.tags}>
            {post.tags.map((tag, index) => (
              <Tag tag={tag} key={`${tag}${index}`} link>
                {tag}
              </Tag>
            ))}
          </div>
        ) : null}

        <section className={articleStyles.content}>
          {processor.processSync(post.content).result}
        </section>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);
  return {
    props: {
      post
    }
  };
}

export default Post;
