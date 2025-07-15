import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./LoginForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import InputFieldWithIcons from "@/components/InputFieldWithIcons";
import FormErrorCard from "../components/FormErrorCard";
import msg from "@/locales/en/auth/login.json";
import { useLazyGetMeQuery, useLoginMutation } from "../services/authApiSlice";
import { ROUTES } from "@/constants/routes";

interface LoginFormProps {
  setCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setCreatingAccount }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [getPersonalDetails] = useLazyGetMeQuery();

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const handleShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (loginData: LoginSchema) => {
    try {
      await login(loginData).unwrap();
      await getPersonalDetails().unwrap();
      methods.reset();
      navigate(-1);
    } catch (err) {
      const apiError = err as { data?: { message?: string }; status?: number };
      setError("root", {
        type: "loginFail",
        message: apiError?.data?.message ?? msg.form.error.default,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginHeaderContainer}>
          <Avatar className={styles.lockIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <p>{msg.form.header}</p>
        </div>
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
          <InputFieldWithIcons
            name="password"
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder={msg.form.placeholders.password}
            startIcon={<i className="fa-solid fa-lock" />}
            endIcon={
              <IconButton onClick={handleShowPassword} sx={{ padding: 0 }}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
            fullWidth
            required
          />
          <div className={styles.forgetPasswordContainer}>
            <Link to={ROUTES.RESET_PASSWORD} className={styles.forgetPassword}>
              {msg.form.forgetPassword}
            </Link>
          </div>
        </div>
        <Button
          label={msg.form.submitButtonLabel}
          className={styles.signInBtn}
        />
        <div className={styles.switchContainer}>
          <p className={styles.switchText}>
            {msg.form.footer.text}
            <button
              type="button"
              className={styles.switchBtn}
              onClick={() => setCreatingAccount(true)}
            >
              {msg.form.footer.btnLabel}
            </button>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
