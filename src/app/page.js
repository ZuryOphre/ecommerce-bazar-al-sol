import Head from 'next/head';
import Header from "@/components/header";
import Main from "@/pages/main/main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bazar al sol</title>
        <meta name="description" content="Tienda de productos Naturales" />
        <meta name="keywords" content="Bazar, Sol, Productos Naturales, curacavi" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Main /> 
    </>
  );
}