import ReactMarkdown from "react-markdown";
import { getImageUrl } from "../../utils/imageUtils";
import styles from "./AboutUs.module.css";
import welcomeMsg from "@/locales/en/welcome.json";

const AboutUs = () => {
  const karungGuniImgs = welcomeMsg.about_us.photos.map(
    ({ src, alt }: { src: string; alt: string }) => (
      <img
        key={src}
        src={getImageUrl(src)}
        alt={alt}
        className={styles.photo}
      />
    ),
  );

  return (
    <section>
      <h2>{welcomeMsg.about_us.header}</h2>
      <ReactMarkdown>{welcomeMsg.about_us.text}</ReactMarkdown>
      <div className={styles.photoContainer}>{karungGuniImgs}</div>
    </section>
  );
};

export default AboutUs;
