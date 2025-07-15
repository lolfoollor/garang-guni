import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/features/auth/reset-password/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./ResetPasswordForm.module.css";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import msg from "@/locales/en/auth/resetPassword.json";
import { useResetPasswordMutation } from "@/features/auth/services/authApiSlice";
import { useNavigate } from "react-router-dom";
import FormErrorCard from "../components/FormErrorCard";
import InputFieldWithIcons from "@/components/InputFieldWithIcons";
import Button from "@/components/Button";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const methods = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (resetPasswordData: ResetPasswordSchema) => {
    try {
      await resetPassword(resetPasswordData).unwrap();
      methods.reset();
      navigate(-1);
    } catch (err) {
      const apiError = err as { data?: { message?: string }; status?: number };
      setError("root", {
        type: "resetFail",
        message: apiError?.data?.message ?? msg.form.error.default,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.resetPasswordForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.resetPasswordHeaderContainer}>
          <Avatar className={styles.lockIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <p>{msg.form.header}</p>
        </div>
        <div className={styles.body}>{msg.form.text}</div>
        {errors.root && <FormErrorCard message={errors.root.message!} />}
        <div className={styles.inputContainer}>
          <InputFieldWithIcons
            name="email"
            className={styles.input}
            placeholder={msg.form.placeholders.email}
            startIcon={<i className="fa-regular fa-envelope" />}
            fullWidth
            required
          />
        </div>
        <Button
          label={msg.form.submitButtonLabel}
          className={styles.resetBtn}
        />
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
