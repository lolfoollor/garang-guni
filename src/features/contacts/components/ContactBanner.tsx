import { getImageUrl } from "@/utils/imageUtils";
import styles from "./ContactBanner.module.css";
import msg from "@/locales/en/contacts/contacts.json";

interface ContactBannerProps {
  isDark?: boolean;
}

const ContactBanner = ({ isDark = false }: ContactBannerProps) => {
  const { morning, night } = msg.contactBanner.photos;
  const banner = isDark ? night : morning;

  return (
    <div className={styles.contactUsBanner}>
      <img
        className={styles.contactUsBannerContent}
        src={getImageUrl(banner.src)}
        alt={banner.alt}
      />
    </div>
  );
};

export default ContactBanner;
