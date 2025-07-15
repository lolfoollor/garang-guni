import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./LocationMap.module.css";
import L, { LatLngExpression } from "leaflet";
import {
  convertStatusToMsg,
  getOpeningStatus,
  OpeningSchedule,
} from "@/utils/LocationUtils";
import msg from "@/locales/en/locations/locations.json";
import { useRef } from "react";

interface LocationMapProps {
  centerPos: LatLngExpression;
  zoom?: number;
  allowZoom?: boolean;
  details: { name: string; location: string; openingSchedule: OpeningSchedule };
}

function LocationMap({
  centerPos,
  zoom = 16,
  allowZoom = true,
  details,
}: LocationMapProps) {
  const status = getOpeningStatus(details.openingSchedule);
  const statusMsg = convertStatusToMsg(status);
  const marker = useRef<L.Marker>(null);

  const openPopUp = () => {
    setTimeout(() => {
      if (marker.current) {
        marker.current.openPopup();
      }
    }, 100);
  };

  return (
    <MapContainer
      center={centerPos}
      zoom={zoom}
      scrollWheelZoom={allowZoom}
      className={styles.container}
      whenReady={openPopUp}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={centerPos} ref={marker}>
        <Popup>
          <div className={styles.popupContainer}>
            <p className={styles.popupTitle}>{details.name}</p>
            <p>{details.location}</p>
            <p>
              {status.isOpen ? (
                <span className={styles.statusOpen}>
                  {msg.locationMap.openMsg}
                </span>
              ) : (
                <span className={styles.statusClosed}>
                  {msg.locationMap.closeMsg}
                </span>
              )}
              <span className={styles.statusMsg}>{statusMsg}</span>
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LocationMap;
