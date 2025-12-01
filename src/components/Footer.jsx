import styles from "../styles/footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const socialLinks = [
        { id: 1, name: "Facebook", icon: FaFacebook, url: "#Facebook", color: "#1877F2" },
        { id: 2, name: "Twitter", icon: FaTwitter, url: "#Twitter", color: "#1DA1F2" },
        { id: 3, name: "Instagram", icon: FaInstagram, url: "#Instagram", color: "#E4405F" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>About Us</h3>
                        <p className={styles.text}>Your trusted online store for quality products and excellent service.</p>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Quick Links</h3>
                        <ul className={styles.links}>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Follow Us</h3>
                        <ul className={styles.social}>
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <li key={social.id}>
                                        <a 
                                            href={social.url} 
                                            aria-label={social.name}
                                            rel="noopener noreferrer"
                                            style={{ "--social-color": social.color }}
                                            className={styles.socialLink}
                                        >
                                            <IconComponent size={20} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>&copy; 2025 My E-commerce. All rights reserved.</p>
                    
                    {showScrollTop && (
                        <button 
                            className={styles.scrollTopBtn}
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                            title="Back to top"
                        >
                            <FaArrowUp size={20} />
                        </button>
                    )}
                </div>
            </div>
        </footer>
    )
}

export default Footer;