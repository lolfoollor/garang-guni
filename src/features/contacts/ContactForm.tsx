import { useState } from "react";
import { Alert } from "@mui/material";
import styles from "./ContactForm.module.css";
import msg from "@/locales/en/contacts/contacts.json";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { contactSchema, ContactSchema } from "./contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/form/FormInputField";
import Button from "@/components/Button";
import ContactFormHeader from "./components/ContactFormHeader";
import Notice from "@/components/Notice";

interface ContactFormProps {
  isDark?: boolean;
  onClick: () => void;
}

type ContactFieldKey = keyof typeof msg.contactForm.fields;

const CONTACT_FIELDS: { key: ContactFieldKey; multiLine?: boolean }[] = [
  { key: "name" },
  { key: "email" },
  { key: "subject" },
  { key: "messageBody", multiLine: true },
] as const;

function ContactForm({ isDark = false, onClick }: ContactFormProps) {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const methods = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      messageBody: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ContactSchema) => {
    // TODO: Add a real backend and store it in postgres.
    console.log("Form data:", data);
    setIsSuccessful(true);
  };

  const onClickNotice = () => {
    onClick();
    setIsSuccessful(false);
  };

  const renderAllErrorMsgs = (errors: FieldErrors) =>
    Object.values(errors).map((error, idx) => (
      <p key={idx}>{error?.message?.toString()}</p>
    ));

  const renderInputsFields = () =>
    CONTACT_FIELDS.map((field) => {
      const { key, multiLine } = field;
      const DEFAULT_NO_ROWS = 4;

      return (
        <FormInputField
          key={key}
          name={key}
          fullWidth
          label={msg.contactForm.fields[key]}
          InputProps={{ className: styles.contactTextField }}
          InputLabelProps={{ className: styles.contactTextLabelField }}
          showErrorText={false}
          disabled={isSuccessful}
          multiline={multiLine}
          rows={DEFAULT_NO_ROWS}
          required
        />
      );
    });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${isDark && styles.dark}`}
      >
        <div className={styles.formContent}>
          <ContactFormHeader />
          <div className={styles.inputContainer}>{renderInputsFields()}</div>
          <div className={styles.requiredNoteContainer}>
            <p className={styles.requiredNote}>
              {msg.contactForm.requiredNote}
            </p>
          </div>
          <div className={styles.formButton}>
            <Button
              className={styles.btn}
              label={msg.contactForm.buttons.submit}
            />
          </div>
          {Object.keys(errors).length !== 0 && (
            <Alert className={styles.alertBox} severity="error">
              {renderAllErrorMsgs(errors)}
            </Alert>
          )}
          <Notice
            open={isSuccessful}
            handleClose={onClickNotice}
            header={msg.contactForm.success.header}
            body={msg.contactForm.success.body}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default ContactForm;
