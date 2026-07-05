import { FaGasPump, FaCar } from "react-icons/fa6";
import { TbAutomaticGearboxFilled } from "react-icons/tb";
import { GiRoundStar } from "react-icons/gi";
import { PiMapTrifoldBold } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import type { CamperList } from "@/types/campers";
import styles from "./CamperCard.module.css";

type CamperCardProps = {
  camper: CamperList;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const detailsUrl = `/campers/${camper.id}`;

  return (
    <article className={styles.camperCard}>
      <Image 
        src={camper.coverImage} 
        alt={camper.name} 
        width={219} 
        height={240} 
        className={styles.cardImage} 
        priority
      />
      
      <div className={styles.head}>
        <div className={styles.headContainer}>
          <h2 className={styles.name}>{camper.name}</h2>
          <p className={styles.price}>€{camper.price.toFixed(2)}</p>
        </div>

        <div className={styles.iconContainer}>
          <span className={styles.star}>
            <GiRoundStar className={styles.iconStar} />
            {camper.rating} ({camper.totalReviews} Reviews)
          </span>
          <span className={styles.location}>
            <PiMapTrifoldBold /> {camper.location}
          </span>
        </div>

        <p className={styles.description}>
          {camper.description.slice(0, 60)}...
        </p>

        <ul className={styles.specList}>
          <li className={styles.specItem}><FaGasPump /> {camper.engine}</li>
          <li className={styles.specItem}><TbAutomaticGearboxFilled /> {camper.transmission}</li>
          <li className={styles.specItem}><FaCar /> 
          {camper.form
           .replace(/_/g, ' ')
           .replace(/\b\w/g, (char) => char.toUpperCase())
          }
          </li>
        </ul>

        <Link href={detailsUrl}
          className={styles.showMoreButton}
          target="_blank" 
          rel="noopener noreferrer">
          Show more
        </Link>
      </div>
    </article>
  );
}