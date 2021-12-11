interface Props {
  href: string;
}

const Link: React.FunctionComponent<Props> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
};

export default Link;
