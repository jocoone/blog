import Image from "next/image";
import Head from "../src/components/Head";
import Layout from "../src/components/Layout";
import styles from "../styles/Base.module.scss";

export default function Home() {
  return (
    <Layout>
      <Head
        title="Contact"
        description="Content blog completely open source deployed on Vercel"
      />
      <section className={styles.main}>contact</section>
    </Layout>
  );
}
