import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import styles from "./RegisterForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorCard from "../components/FormErrorCard";
import msg from "@/locales/en/auth/register.json";
import InputFieldWithIcons from "@/components/InputFieldWithIcons";
import Button from "@/components/Button";
import {
  useLazyGetMeQuery,
  useRegisterMutation,
} from "../services/authApiSlice";

interface RegisterFormProps {
  setCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm({
  setCreatingAccount,
}: RegisterFormProps) {
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [getPersonalDetails] = useLazyGetMeQuery();

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const toggleShowPassword = (field: "password" | "confirmPassword") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (registerData: RegisterSchema) => {
    try {
      await register(registerData).unwrap();
      await getPersonalDetails().unwrap();
      methods.reset();
      navigate(-1);
    } catch (err) {
      const apiError = err as { data?: { message?: string }; status?: number };
      setError("root", {
        type: "registerFail",
        message: apiError?.data?.message ?? msg.form.error.default,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.registerHeaderContainer}>
          <Avatar className={styles.registerIcon}>
            <AppRegistrationOutlinedIcon />
          </Avatar>
          <p>{msg.form.header}</p>
        </div>
        {errors.root && <FormErrorCard message={errors.root.message!} />}
        <div className={styles.inputContainer}>
          <InputFieldWithIcons
            name="username"
            className={styles.input}
            placeholder={msg.form.placeholders.username}
            startIcon={<i className="fa-regular fa-user" />}
            fullWidth
            required
          />
          <InputFieldWithIcons
            name="email"
            className={styles.input}
            placeholder={msg.form.placeholders.email}
            startIcon={<i className="fa-regular fa-envelope" />}
            fullWidth
            required
          />
          <InputFieldWithIcons
            name="password"
            className={styles.input}
            type={showPasswords.password ? "text" : "password"}
            placeholder={msg.form.placeholders.password}
            startIcon={<i className="fa-solid fa-lock" />}
            endIcon={
              <IconButton
                onClick={() => toggleShowPassword("password")}
                sx={{ padding: 0 }}
              >
                {showPasswords.password ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
            fullWidth
            required
          />
          <InputFieldWithIcons
            name="confirmPassword"
            className={styles.input}
            type={showPasswords.confirmPassword ? "text" : "password"}
            placeholder={msg.form.placeholders.confirmPassword}
            startIcon={<i className="fa-solid fa-lock" />}
            endIcon={
              <IconButton
                onClick={() => toggleShowPassword("confirmPassword")}
                sx={{ padding: 0 }}
              >
                {showPasswords.confirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            }
            fullWidth
            required
          />
        </div>
        <Button
          label={msg.form.submitButtonLabel}
          className={styles.registerBtn}
        />
        <div className={styles.switchContainer}>
          <p className={styles.switchText}>
            {msg.form.footer.text}
            <button
              type="button"
              className={styles.switchBtn}
              onClick={() => setCreatingAccount(false)}
            >
              {msg.form.footer.btnLabel}
            </button>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
