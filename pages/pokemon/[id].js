/*eslint-disable @next/next/no-img-element */
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export default function Card() {
  const [pokemon, setPokemon] = useState({});
  const {
    query: {id},
  } = useRouter();

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      const data = await response.json();
      setPokemon(data);
    };

    if (id) {
      getPokemon();
    }
  }, [id]);
  //   {
  //     "name": "Bulbasaur",
  //     "type": [
  //       "Grass",
  //       "Poison",
  //       "Super awesome",
  //       "Crazy awesome",
  //       "Mucho crazy awesome"
  //     ],
  //     "stats": [
  //       {
  //         "name": "HP",
  //         "value": 45
  //       },
  //       {
  //         "name": "Attack",
  //         "value": 49
  //       },
  //       {
  //         "name": "Defense",
  //         "value": 49
  //       },
  //       {
  //         "name": "Special Attack",
  //         "value": 65
  //       },
  //       {
  //         "name": "Special Defense",
  //         "value": 65
  //       },
  //       {
  //         "name": "Speed",
  //         "value": 45
  //       }
  //     ],
  //     "image": "images/bulbasaur.jpg"
  //   }

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
