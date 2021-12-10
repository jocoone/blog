import Link from "next/link";
import Image from "next/image";

interface Props {
  className?: string;
}

const Layout: React.FunctionComponent<Props> = ({ className, children }) => {
  return (
    <div className={`blog-layout ${className || ""}`}>
      <header>
        <Link href="/" passHref>
          <div className="header__logo">
            <div className="header__logo__image">
              <Image src="/images/logo.svg" width={70} height={70} alt="logo" />
            </div>
            Open source blog
          </div>
        </Link>
        <nav>
          <Link href="/contact">contact</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <Image src="/images/logo.svg" width={30} height={30} alt="logo" />
        <span className="footer__copyright">&copy; Copyright 2022</span>
      </footer>
    </div>
  );
};

export default Layout;
