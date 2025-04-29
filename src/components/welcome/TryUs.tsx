import { NavLink } from "react-router-dom";
import styles from "./TryUs.module.css";
import ReactMarkdown, { Components } from "react-markdown";

const TRY_US_CONTENT = {
  HEADER: "Try Us Now",
  PARAGRAPHS: `Our platform is easy!  
    Create your [Account](/auth), view the station [schedule](/schedule), 
    and [book](/book) the slot.  
    We will come and serve you!`,
};

const markdownComponents: Components = {
  a({ href, children }) {
    return (
      <NavLink to={href ?? "#"} className={styles.link}>
        {children}
      </NavLink>
    );
  },
};

const TryUs = () => {
  return (
    <section className={styles.tryUsContainer}>
      <h2>{TRY_US_CONTENT.HEADER}</h2>
      <ReactMarkdown components={markdownComponents}>
        {TRY_US_CONTENT.PARAGRAPHS}
      </ReactMarkdown>
    </section>
  );
};

export default TryUs;
