import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { loginAuth } from "../../services/auth";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/pages/Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";

export default function LoginContent() {
  const classes = useStyles();
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();

  const validationSchemaLogin = yup.object({
    login: yup
      .string("Escreva seu CPF")
      .required("Preencha com o CPF")
      .test("unique-login", "CPF inválido", function (val) {
        return val === undefined || val === "admin" ? true : validateCPF(val);
      }),
    password: yup
      .string("Escreva uma senha")
      .min(8, "Senha deve ter no minimo 8 digitos!")
      .when("login", {
        is: (val) => val !== "admin",
        then: yup.string().min(8, "Senha deve ter no minimo 8 digitos!"),
        otherwise: yup.string().min(0),
      })
      .required("Preencha a senha"),
  });

  const formikLogin = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      const { login, password } = values;

      const regex = /[.,/*+;'"_-]/g;
      const filteredLogin = login.replace(regex, "");

      try {
        const response = await api.post("/login", { login: filteredLogin , password });
        console.log("response:", response.data);

        const { token, user_class, id, full_name } = response.data;
        loginAuth(id, full_name, user_class, token);

        switch (user_class) {
          case "admin":
            history.push("/admin");
            break;
          case "patient":
            history.push(`/patient/${id}`);
            break;
          case "doctor":
            history.push(`/doctor/list/${id}`);
            break;
          default:
            history.push("/login");
            break;
        }
      } catch (err) {
        console.log("ERRO:", err);
        setInvalid(true);
      }
    },
  });

  return (
    <div className={styles.content}>
      <Link style={{ textDecoration: "none" }} to="/home">
        <img
          className={styles.logoTop}
          src="/img/DuckHealth_PNG.png"
          alt="logo"
        ></img>
      </Link>
      <img
        className={styles.curveLeft}
        src="/img/bg-login-curves-left.svg"
        alt="curves"
      ></img>
      <img
        className={styles.curveRight}
        src="/img/bg-login-curves-right.svg"
        alt="curves"
      ></img>
      <div className={styles.loginContent}>
        <h1 className={styles.welcome}>Bem-vindo</h1>
        <h2 className={styles.descrip}>
          Acesse seus <span>laudos</span> agora!
        </h2>
        <div className={styles.formContent}>
          {invalid && (
            <div className={styles.userNotFound}>
              <h3>CPF ou Senha inválida!</h3>
            </div>
          )}
          <form
            className={styles.formFields}
            onSubmit={formikLogin.handleSubmit}
          >
            <TextField
              placeholder="Escreva seu Login/CPF"
              className={classes.root}
              variant="outlined"
              margin="normal"
              fullWidth
              id="login"
              name="login"
              type="login"
              InputLabelProps={{ shrink: false }}
              value={formikLogin.values.login}
              onChange={formikLogin.handleChange}
              error={
                formikLogin.touched.login && Boolean(formikLogin.errors.login)
              }
              helperText={formikLogin.touched.login && formikLogin.errors.login}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleRoundedIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className={classes.root}
              placeholder="Escreva sua senha"
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              name="password"
              InputLabelProps={{ shrink: false }}
              type="password"
              value={formikLogin.values.password}
              onChange={formikLogin.handleChange}
              error={
                formikLogin.touched.password &&
                Boolean(formikLogin.errors.password)
              }
              helperText={
                formikLogin.touched.password && formikLogin.errors.password
              }
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className={classes.btn}
              variant="contained"
              fullWidth
              size="large"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </div>
        <div className={styles.forgotPassword}>
          <i className="fas fa-question"></i>
          <p>
            Esqueceu sua senha? <a className={styles.link}>Clique aqui!</a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    "& .MuiInput-underline:after": {
      borderBottomColor: "var(--blue-text)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--blue-text)",
      },
    },
  },
  focused: {},
  btn: {
    backgroundColor: "#FFD666",
    color: "var(--blue-text)",
    fontFamily: "nunito, sans-serif",
    fontWeight: "800",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#FFD610",
    },
  },
  icon: {
    color: "var(--blue-buttom-sidebar)",
  },
}));

function validateCPF(cpf) {
  const regex = /[.,/*+;'"_-]/g;
  const filtered = cpf.replace(regex, "");

  const condition1 = filtered.length === 11;

  const condition2 = allDifferent(filtered);

  const condition3 =
    findJ(filtered) === parseInt(filtered.charAt(filtered.length - 2));

  const condition4 =
    findK(filtered) === parseInt(filtered.charAt(filtered.length - 1));

  return condition1 && condition2 && condition3 && condition4 ? true : false;
}

function findJ(cpf) {
  var j = 0;
  var i = 10;
  var count = 0;
  var resto;

  for (i, j; j < cpf.length - 2; i--, j++) {
    count += cpf[j] * i;
  }

  resto = count % 11;

  if (resto === 0 || resto === 1) {
    return 0;
  } else {
    return 11 - resto;
  }
}

function findK(cpf) {
  var j = 0;
  var i = 11;
  var count = 0;
  var resto;

  for (i, j; j < cpf.length - 1; i--, j++) {
    count += cpf[j] * i;
  }

  resto = count % 11;

  if (resto === 0 || resto === 1) {
    return 0;
  } else {
    return 11 - resto;
  }
}

function allDifferent(cpf) {
  var firstValue = cpf[0];
  var count = 0;
  var i = 1;
  for (i in cpf) {
    if (cpf[i] === firstValue) {
      count++;
    }
  }

  return count === 11 ? false : true;
}
