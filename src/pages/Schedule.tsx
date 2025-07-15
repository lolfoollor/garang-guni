import styles from "./Schedule.module.css";
import ContentWrapper from "@/components/ContentWrapper.js";
import msg from "@/locales/en/locations/locations.json";
import LocationList from "@/features/locations/LocationList.js";

function Schedule() {
  return (
    <div className={styles.scheduleContainer}>
      <ContentWrapper>
        <div className={styles.locationContent}>
          <p className={styles.header}>{msg.main.header}</p>
          <div className={styles.locationListContainer}>
            <LocationList />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Schedule;
