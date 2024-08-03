import styles from './CTAForm.module.css';

export default function CTAForm() {
  return (
    <section className={styles['cta']}>
      <div className={styles['container']}>
        <div className={styles['title-wrapper']}>
          <h2 className={styles['cta-title']}>
            Subscribe for our <strong>FREE</strong> bulletin
          </h2>
          <p className={styles['cta-text']}>
            Get weekly updates about hottest performances and events, exclusive
            discounts, &amp; more!
          </p>
        </div>
        <form action="" method="POST" className={styles['cta-form']}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className={styles['email-field']}
          />
          <button type="submit" className={styles['cta-form-btn']}>
            Get started
          </button>
        </form>
      </div>
    </section>
  );
}
