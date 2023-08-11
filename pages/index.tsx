import { Fragment } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>{`Add Product`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={``}>
        <h2 className={`bg-blue-400 text-white`}>Main Page</h2>
        <Link href={`/addProduct`}>Add Product</Link>
      </main>
    </Fragment>
  );
}
