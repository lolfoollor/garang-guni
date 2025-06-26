import Loading from "@/components/Loading";
import styles from "./RateTable.module.css";
import { Rate } from "../services/ratesApiSlice";
import msg from "@/locales/en/rates/rates.json";

interface RateTableProps {
  rates: Rate[];
  isLoading?: boolean;
}

const DEFAULT_LOADING_ROWS = 4;
const DEFAULT_LOADING_ICON_SIZE = 40;

const RateTable = ({ rates, isLoading = false }: RateTableProps) => {
  const orderedKeys: (keyof typeof msg.table.headers)[] = [
    "name",
    "pickupRate",
    "dropoffRate",
    "unit",
  ];

  const renderTableHeader = () => {
    const headers = msg.table.headers;
    const headerElem = orderedKeys.map((key) => (
      <th key={key} className={styles.tableHeader}>
        {headers[key]}
      </th>
    ));
    return headerElem;
  };

  const renderLoadingTableBody = () =>
    Array.from({ length: DEFAULT_LOADING_ROWS }).map((_, idx) => (
      <tr key={idx} className={styles.tableBodyRow}>
        <td
          colSpan={orderedKeys.length}
          className={styles.tableLoadingCol}
        ></td>
      </tr>
    ));

  const renderTableBody = () => {
    const isPickUpRate = (key: string) => key === "pickupRate";
    const isDropoffRate = (key: string) => key === "dropoffRate";

    return rates.map((rate: Rate) => (
      <tr key={rate.rateId} className={styles.tableBodyRow}>
        {orderedKeys.map((key) => {
          const requireDollarSymbol = isPickUpRate(key) || isDropoffRate(key);

          return (
            <td key={key} className={styles.tableBodyCol}>
              {requireDollarSymbol ? "$" : ""}
              {rate[key]}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeaderContainer}>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody className={styles.tableBodyContainer}>
          {isLoading ? renderLoadingTableBody() : renderTableBody()}
        </tbody>
      </table>

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.loadingBg}></div>
          <div className={styles.loadingIconContainer}>
            <Loading size={DEFAULT_LOADING_ICON_SIZE} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RateTable;
