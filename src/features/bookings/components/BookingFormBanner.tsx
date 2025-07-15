import Logo from "@/components/Logo";
import styles from "./BookingFormBanner.module.css";
import companyIcon from "@/assets/logo.png";
import msg from "@/locales/en/bookings/components/bookingForm.json";

interface BookingFormBannerProps {
  bannerText: string;
}

const BookingFormBanner = ({ bannerText }: BookingFormBannerProps) => {
  return (
    <div className={styles.banner}>
      <span className={styles.bannerText}>{bannerText}</span>
      <div className={styles.companyLogoAndText}>
        <img
          className={styles.companyIcon}
          src={companyIcon}
          alt={msg.imgAltCompanyIcon}
        />
        <Logo />
      </div>
    </div>
  );
};

export default BookingFormBanner;
