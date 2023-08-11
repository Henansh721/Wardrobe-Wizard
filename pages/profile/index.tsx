import Image from "next/image";
import { Inter } from "next/font/google";
import { Fragment } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
  return (
    <Fragment>
      <Head>
        <title>{`User Profile`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`bg-blue-400`}>
        <h2>Profile</h2>
      </main>
    </Fragment>
  );
}
