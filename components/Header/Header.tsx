import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image 
          src="/logo.svg" 
          alt="TravelTrucks" 
          width={136} 
          height={16} 
          priority 
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/campers" className={styles.navLink}>Catalog</Link>
      </nav>
    </header>
  );
};