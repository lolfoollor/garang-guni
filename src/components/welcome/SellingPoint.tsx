import ReactMarkdown from "react-markdown";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./SellingPoint.module.css";
import welcomeMsg from "@/locales/en/components/welcome.json";

const SellingPoint = () => {
  return (
    <section>
      <h2>{welcomeMsg.selling_point.header}</h2>
      <div className={styles.sellingPointsContainer}>
        <div className={styles.sellingPointMiddleContainer}>
          {welcomeMsg.selling_point.reasons.map((reason: string, i: number) => (
            <div key={i} className={styles.sellingPointContainer}>
              <FaThumbsUp className={styles.sellingPointIcon} />
              <ReactMarkdown>{reason}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellingPoint;
