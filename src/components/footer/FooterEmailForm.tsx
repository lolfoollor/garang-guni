import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./FooterEmailForm.module.css";
import { validateEmail } from "../../utils/validation";
import formMsgs from "@/locales/en/components/formMsgs.json";
import Button from "../Button";
import { interpolateMessage } from "@/utils/textUtils";

const EMAIL_TO_UNSUBSCRIBE = "test@test.test";

const FooterEmailForm = () => {
  const [email, setEmail] = useState<string>(formMsgs.form.email.empty);
  const [errorMsg, setErrorMsg] = useState<string>(formMsgs.form.email.empty);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(formMsgs.form.email.empty);
    if (e.target.value === formMsgs.form.email.empty) {
      setErrorMsg(formMsgs.form.email.required);
    } else if (!validateEmail(e.target.value)) {
      setErrorMsg(formMsgs.form.email.invalid);
    }

    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMsg) return;

    if (email === formMsgs.form.email.empty) {
      alert(formMsgs.form.email.alert_empty);
      return;
    }

    setEmail(formMsgs.form.email.empty);
    alert(
      interpolateMessage(formMsgs.form.email.alert_success, {
        email: EMAIL_TO_UNSUBSCRIBE,
      }),
    );

    // TODO: Make it do something.
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formInputButtonWrapper}>
        <input
          name="email"
          type="email"
          autoComplete="on"
          value={email}
          onChange={handleChange}
          placeholder={formMsgs.form.email.placeholder}
          className={`${styles.formEmailInput} ${
            errorMsg && styles.formEmailInputError
          }`}
        />
        <Button
          label={formMsgs.form.email.subscribe}
          className={styles.formSubmitButton}
        />
      </div>
      {errorMsg && <p className={styles.formErrorMsg}>{errorMsg}</p>}
    </form>
  );
};

export default FooterEmailForm;
