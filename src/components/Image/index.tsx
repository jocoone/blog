import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

const Link: React.FunctionComponent<Props> = ({
  src,
  alt,
  className,
  title
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`post-image ${className || ""} ${
        alt.includes("inline") ? "inline" : ""
      }`}
      src={src}
      alt={alt}
      title={title}
    />
  );
};

export default Link;
