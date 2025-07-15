import styles from "./Rates.module.css";
import ContentWrapper from "@/components/ContentWrapper";
import RateList from "@/features/rates/RateList";
import RateFooter from "@/features/rates/components/RateFooter";
import msg from "@/locales/en/rates/rates.json";

function Rates() {
  return (
    <div className={styles.list}>
      <ContentWrapper>
        <p className={styles.header}>{msg.main.header}</p>
        <div className={styles.ratesContainer}>
          <RateList />
        </div>
        <RateFooter />
      </ContentWrapper>
    </div>
  );
}

export default Rates;
