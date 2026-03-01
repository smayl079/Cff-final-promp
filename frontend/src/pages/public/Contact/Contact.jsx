import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className="container">
        <h1>Contact Us</h1>
        
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            
            <div className={styles.infoItem}>
              <h3>Address</h3>
              <p>123 Main Street<br />City, State 12345</p>
            </div>

            <div className={styles.infoItem}>
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
            </div>

            <div className={styles.infoItem}>
              <h3>Email</h3>
              <p>info@carrepairservice.com</p>
            </div>

            <div className={styles.infoItem}>
              <h3>Business Hours</h3>
              <p>
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <div className={styles.contactForm}>
            <h2>Send us a Message</h2>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Phone Number" />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
