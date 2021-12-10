import NextHead from "next/head";

interface Props {
  title: string;
  description?: string;
}

const Head: React.FunctionComponent<Props> = ({
  title,
  description,
  children
}) => {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />

      {description ? <meta name="description" content={description} /> : null}
      {children}
    </NextHead>
  );
};

export default Head;
