import Link from "next/link";

import tagStyles from "../../../styles/Tag.module.scss";

interface Props {
  tag: string;
  link?: boolean;
}

const Tag: React.FunctionComponent<Props> = ({
  tag,
  children,
  link = false
}) => {
  return (
    <span className={tagStyles.tag}>
      {link ? <Link href={`/search?tag=${tag}`}>{children}</Link> : children}
    </span>
  );
};

export default Tag;
