import { getImageUrl } from "@/utils/imageUtils";
import styles from "./LocationCard.module.css";
import msg from "@/locales/en/locations/locations.json";
import { interpolateMessage } from "@/utils/textUtils";
import { Location } from "./Location";

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  const { region: regionTag, name, imgDetail, address, days, times } = location;
  const details = [
    { key: "address", value: address },
    { key: "days", value: days.join(", ") },
    { key: "times", value: times.join(", ") },
  ] as const;

  const renderLocationDetails = () => {
    return details.map(({ key, value }) => (
      <p key={key} className={styles.detailsText}>
        {interpolateMessage(msg.locationCard[key], { [key]: value })}
      </p>
    ));
  };

  return (
    <div className={styles.locationCard}>
      <div className={styles.regionTagContainer}>
        <p className={styles.regionTag}>{regionTag}</p>
      </div>

      <p className={styles.locationName}>{name}</p>
      <div className={styles.imgContainer}>
        <img
          className={styles.mapImage}
          src={getImageUrl(imgDetail.src)}
          alt={imgDetail.alt}
        />
      </div>
      {renderLocationDetails()}
    </div>
  );
};

export default LocationCard;
