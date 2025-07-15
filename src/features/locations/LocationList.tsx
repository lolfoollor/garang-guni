import { convertJsonToLocation } from "@/utils/LocationUtils";
import { Location } from "./components/Location";
import LocationCard from "./components/LocationCard";
import styles from "./LocationList.module.css";
import msg from "@/locales/en/locations/locations.json";
import { useState } from "react";
import { Dialog } from "@mui/material";
import LocationMap from "./components/LocationMap";

// Todo: Add admins that are able to add locations.
const LocationList = () => {
  const [isDialogActive, setDialogActive] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const handleClick = (location: Location) => {
    setDialogActive(true);
    setSelectedLocation(location);
  };

  const closeDialog = () => {
    setDialogActive(false);
  };

  const renderLocations = () => {
    const locations = convertJsonToLocation(msg.locations);
    return locations.map((location: Location, idx) => (
      <div
        className={styles.clickableLocation}
        onClick={() => handleClick(location)}
        key={idx}
      >
        <LocationCard location={location} />
      </div>
    ));
  };

  return (
    <>
      <div className={styles.locationList}>{renderLocations()}</div>
      <Dialog
        fullScreen={true}
        open={isDialogActive}
        onClick={closeDialog}
        PaperProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {selectedLocation && (
          <div
            className={styles.dialogContent}
            onClick={(e) => e.stopPropagation()}
          >
            <LocationMap
              centerPos={selectedLocation.latLng}
              details={{
                name: selectedLocation.name,
                location: selectedLocation.address,
                openingSchedule: {
                  days: selectedLocation.days,
                  times: selectedLocation.times,
                },
              }}
            />
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeDialog}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default LocationList;
