import { MapContainer, Marker, TileLayer } from "react-leaflet";
import styles from "./ContactVisitUs.module.css";
import "leaflet/dist/leaflet.css";
import msg from "@/locales/en/contacts/contacts.json";

const DEFAULT_LEAFLET_ZOOM = 16;
const DEFAULT_LOCATION_POS = { lat: 1.3087, lng: 103.81228 };

const ContactVisitUs = () => {
  const position = DEFAULT_LOCATION_POS;
  return (
    <div className={styles.visitUsContainer}>
      <p className={styles.visitUsHeader}>{msg.contactVisitUs.header}</p>
      <div className={styles.mapContainer}>
        <MapContainer
          center={position}
          zoom={DEFAULT_LEAFLET_ZOOM}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>
      <p className={styles.warning}>{msg.contactVisitUs.warning}</p>
    </div>
  );
};

export default ContactVisitUs;
