import { useNavigate } from "react-router-dom";
import styles from "./FooterCopyright.module.css";
import footerMsg from "@/locales/en/components/footer.json";
import Button from "../Button";
import { ROUTES } from "../../constants/routes";

const FooterCopyright = () => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  const footerEndLinks = [
    { name: footerMsg.terms_of_service, link: ROUTES.TOS },
    { name: footerMsg.privacy_policy, link: ROUTES.TERMS_AND_PRIVACY },
    { name: footerMsg.cookies, link: ROUTES.COOKIES },
  ];

  return (
    <div className={styles.footerCopyrightContainer}>
      <p className={styles.footerCopyright}>{footerMsg.copyright}</p>
      <div className={styles.footerLinkContainer}>
        {footerEndLinks.map(({ name, link }) => (
          <Button
            key={name}
            label={name}
            onClick={() => handleClick(link)}
            className={styles.footerLinkButton}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterCopyright;
