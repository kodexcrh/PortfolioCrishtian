import styles from "./Footer.module.css";

export default function Footer({ T }) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span className={styles.text} style={{ color: T.textFaint }}>
        <span className={styles.cloud}>Cloud</span>
        <span className={styles.coders}>Coders</span>
        {` Copyright © ${year} Todos los derechos reservados`}
      </span>
    </footer>
  );
}
