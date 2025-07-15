import ReactMarkdown from "react-markdown";
import styles from "./Introduction.module.css";
import welcomeMsg from "@/locales/en/components/welcome.json";
import { getImageUrl } from "@/utils/imageUtils";

const Introduction = () => {
  const garangGuniPhoto = (
    <img
      src={getImageUrl(welcomeMsg.introduction.photo.src)}
      alt={welcomeMsg.introduction.photo.alt}
      className={styles.introPhoto}
    />
  );

  const paragraphs: { catchphrase: string; text: string }[] = Object.values(
    welcomeMsg.introduction.paragraphs,
  );

  return (
    <section className={styles.introductionContainer}>
      {garangGuniPhoto}
      <div className={styles.introduction}>
        {paragraphs.map((para, idx) => (
          <div key={idx}>
            <h2 className={styles.catchphrase}>{para.catchphrase}</h2>
            <ReactMarkdown>{para.text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Introduction;
