/*eslint-disable @next/next/no-img-element */
import {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  const data = await response.json();

  return {
    props: {
      pokedex: data,
    },
  };
};

export default function Home({pokedex}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h1 style={{textAlign: "center"}}>Pokemon List</h1>
      <div className={styles.grid}>
        {pokedex.map((pokemon, i) => (
          <div key={i} className={styles.card}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
