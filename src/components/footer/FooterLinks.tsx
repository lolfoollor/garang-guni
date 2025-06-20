import styles from "./FooterLinks.module.css";
import footerMsg from "@/locales/en/components/footer.json";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { ROUTES } from "../../constants/routes";

interface LinkDetail {
  name: string;
  link: string;
}

const linksByCategory: { [category: string]: LinkDetail[] } = {
  [footerMsg.categories.home]: [
    { name: footerMsg.link_labels.list_and_rates, link: ROUTES.LIST },
    { name: footerMsg.link_labels.drop_off, link: ROUTES.DROP_OFF },
    { name: footerMsg.link_labels.faq, link: ROUTES.FAQ },
  ],
  [footerMsg.categories.services]: [
    { name: footerMsg.link_labels.manage_booking, link: ROUTES.BOOK },
    { name: footerMsg.link_labels.history, link: ROUTES.HISTORY },
    { name: footerMsg.link_labels.settings, link: ROUTES.SETTING },
    { name: footerMsg.link_labels.follow_us, link: ROUTES.FOLLOW },
  ],
  [footerMsg.categories.about_us]: [
    { name: footerMsg.link_labels.documentation, link: ROUTES.DOCUMENTATION },
    { name: footerMsg.link_labels.contact_us, link: ROUTES.CONTACT },
    { name: footerMsg.link_labels.manage_account, link: ROUTES.PROFILE },
    { name: footerMsg.link_labels.news_and_media, link: ROUTES.HOME },
    { name: footerMsg.link_labels.careers, link: ROUTES.JOBS },
  ],
};

const FooterLinks = () => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  const footerLinkElm = Object.keys(linksByCategory).map((category) => (
    <div key={category} className={styles.footerLinkCategoryContainer}>
      <h3 className={styles.footerCategory}>{category}</h3>
      <ul className={styles.footerUl}>
        {linksByCategory[category].map((linkDetails) => (
          <li key={linkDetails.name}>
            <Button
              label={linkDetails.name}
              onClick={() => handleClick(linkDetails.link)}
              className={styles.footerLinkButton}
            />
          </li>
        ))}
      </ul>
    </div>
  ));

  return <div className={styles.footerLinkContainer}>{footerLinkElm}</div>;
};

export default FooterLinks;
