import { useGetRatesQuery } from "./services/ratesApiSlice";
import { groupRatesByCategory } from "@/utils/rateUtils";
import RateTable from "./components/RateTable";
import styles from "./RateList.module.css";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import msg from "@/locales/en/rates/rates.json";

const DEFAULT_NO_OF_TEMP_TABLES = 3;

const RateList = () => {
  const { data: rates = [], isLoading, isError, error } = useGetRatesQuery();

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  if (isLoading) {
    const tempTables = Array.from({ length: DEFAULT_NO_OF_TEMP_TABLES }).map(
      (_, idx) => (
        <div key={idx} className={styles.rateTableContainer}>
          <p className={styles.category}>{msg.list.loading}</p>
          <RateTable rates={[]} isLoading={true} />
        </div>
      ),
    );
    return <div className={styles.rateListContainer}>{tempTables}</div>;
  }

  const ratesByCategory = groupRatesByCategory(rates);
  const renderTables = Object.entries(ratesByCategory).map(
    ([category, rates]) => (
      <div key={category} className={styles.rateTableContainer}>
        <p className={styles.category}>{capitalizeFirstLetter(category)}</p>
        <RateTable rates={rates} />
      </div>
    ),
  );

  return <div className={styles.rateListContainer}>{renderTables}</div>;
};

export default RateList;
