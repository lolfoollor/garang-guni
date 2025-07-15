import styles from "./Welcome.module.css";
import ContentWrapper from "../components/ContentWrapper";
import SellingPoint from "../components/welcome/SellingPoint";
import Introduction from "../components/welcome/Introduction";
import AboutUs from "../components/welcome/AboutUs";
import TryUs from "../components/welcome/TryUs";

function Welcome() {
  return (
    <div className={styles.welcomeContainer}>
      <ContentWrapper>
        <Introduction />
        <hr />
        <AboutUs />
        <hr />
        <SellingPoint />
        <hr />
        <TryUs />
      </ContentWrapper>
    </div>
  );
}

export default Welcome;
