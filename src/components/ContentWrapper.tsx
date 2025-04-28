import { ReactNode } from "react";
import styles from "./ContentWrapper.module.css";

interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className={styles.contentWrapper}>{children}</div>;
};

export default ContentWrapper;
