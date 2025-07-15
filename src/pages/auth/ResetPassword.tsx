import styles from "./ResetPassword.module.css";
import ContentWrapper from "@/components/ContentWrapper";
import ResetPasswordForm from "@/features/auth/reset-password/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className={styles.resetPassword}>
      <ContentWrapper>
        <div className={styles.resetPasswordContainer}>
          <ResetPasswordForm />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ResetPassword;
