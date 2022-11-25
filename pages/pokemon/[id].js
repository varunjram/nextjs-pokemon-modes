/*eslint-disable @next/next/no-img-element */
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export const getServerSideProps = async ({params}) => {
  const response = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  const data = await response.json();

  return {
    props: {
      pokemon: data,
    },
  };
};

export default function Card({pokemon}) {
  return (
    <div className={styles.main}>
      <Link href="/" className={styles.bkLink}>
        &#8592; &nbsp; Back to Home
      </Link>
      <section className={styles.statCard}>
        <Head>
          <title>{pokemon.name}</title>
        </Head>
        <div className={styles.imageDiv}>
          <img
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div className={styles.content}>
          <h3>{pokemon.name}</h3>
          <div className={styles.type}>
            {pokemon.type?.map((item, i) => (
              <span key={i}>{item}, &nbsp;</span>
            ))}
            {/* {JSON.stringify(pokemon.type)} */}
          </div>
          <table>
            <tr>
              <th className={styles.name}>Name</th>
              <th className={styles.value}>Pt.</th>
            </tr>
            {pokemon.stats?.map((stat, i) => (
              <tr key={i}>
                <td className={styles.name}>{stat.name}</td>
                <td className={styles.value}>{stat.value}</td>
              </tr>
            ))}
          </table>
        </div>
      </section>
    </div>
  );
}
