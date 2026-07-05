"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GiRoundStar } from "react-icons/gi";
import { PiMapTrifoldBold } from "react-icons/pi";
import Loading from "@/app/loading";
import { useCamperData } from "@/hooks/useCamperData";
import { VEHICLE_DETAILS } from "@/lib/constants";
import styles from "./CamperDetailsPage.module.css";

export default function CamperDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { camperQuery, reviewsQuery } = useCamperData(id);

  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (camperQuery.isLoading) return <Loading />;
  if (camperQuery.isError || !camperQuery.data) {
    return <main className={styles.center}>Camper not found.</main>;
  }

  const { data: camper } = camperQuery;
  const { data: reviews = [] } = reviewsQuery;

  const gallery = camper.gallery || [];
  const activeImage = gallery[activeIndex]?.original || gallery[0]?.original || "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Booking request for ${name} submitted!`);
  };
  const renderDetail = (label: string, key: keyof typeof camper) => (
    <p key={label}>
      <span>{label}</span>
      <span>{String(camper[key] ?? "")}</span>
    </p>
  );

  return (
    <main className={styles.pageContainer}>
      <div className={styles.detailsLayout}>
        <div className={styles.gallerySection}>
          <div className={styles.galleryWrapper}>
            <Image src={activeImage} alt={camper.name} width={638} height={505} className={styles.mainPreview} priority />
            <ul className={styles.thumbnailList}>
              {gallery.slice(0, 4).map((img, i) => (
                <li key={img.id}>
                  <button
                    type="button"
                    className={`${styles.thumbnailButton} ${activeIndex === i ? styles.active : ""}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <Image src={img.thumb} alt={camper.name} width={136} height={144} className={styles.thumbnailImage} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <section className={styles.reviewsSection}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <ul className={styles.reviewsList}>
              {reviews.map((rev) => (
                <li key={rev.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerAvatar}>{rev.reviewer_name[0]}</div>
                    <div className={styles.reviewerInfo}>
                      <h3 className={styles.reviewerName}>{rev.reviewer_name}</h3>
                      <div className={styles.ratingStars}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <GiRoundStar key={i} className={i < rev.reviewer_rating ? styles.starActive : styles.starInactive} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{rev.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.detailsColumn}>
          <section className={styles.camperCard}>
            <h1 className={styles.camperTitle}>{camper.name}</h1>
            <div className={styles.camperMeta}>
              <span className={styles.camperRating}><GiRoundStar /> {camper.rating}({camper.totalReviews} Reviews)</span>
              <span className={styles.camperLocation}><PiMapTrifoldBold /> {camper.location}</span>
            </div>
            <p className={styles.camperPrice}>€{camper.price}</p>
            <p className={styles.camperDescription}>{camper.description}</p>
          </section>

          <section className={styles.vehicleCard}>
            <h2 className={styles.sectionHeading}>Vehicle details</h2>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>{camper.transmission}</li>
              <li className={styles.featureItem}>AC</li>
              <li className={styles.featureItem}>{camper.engine}</li>
              {camper.amenities?.slice(0, 3).map((item) => <li className={styles.featureItem} key={item}>{item}</li>)}
            </ul>
            <hr className={styles.sectionDivider} />
            <div className={styles.table}>
              {VEHICLE_DETAILS.map((d) => renderDetail(d.label, d.key as keyof typeof camper))}
            </div>
          </section>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h2>Book your campervan now</h2>
            <p>Stay connected! We are always ready to help you.</p>
            <div className={styles.formInputsWrapper}>
            <input type="text" placeholder="&nbsp;Name*" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="&nbsp;Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send</button>
            </div>
            </form>
        </div>
      </div>
    </main>
  );
}