import React, { useState, forwardRef } from "react";
import styles from "../styles/components/AdminList.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, InputAdornment } from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export const ModalDoctor = forwardRef((props, ref) => {
  const {
    classes,
    modalStyle,
    handleAdd,
    handleEdit,
    handleClose,
    loginList,
    setSuccess,
    typeModal,
    user,
  } = props;
  const [visiblePasswd, setVisiblePasswd] = useState(false);

  const validationSchemaDoctor = yup.object({
    full_name: yup
      .string("Escreva o nome completo")
      .required("Preencha com o nome completo"),
    specialty: yup
      .string("Escrava a especialidade do médico!")
      .required("Preencha a especialidade do médico"),
    login: yup
      .string("Escrava seu CPF")
      .min(11, "Número de CPF inválido!")
      .required("Preencha com o CPF!")
      .test("cpf-format", "Este CPF já foi cadastrado!", function (val) {
        return (
          val !== undefined &&
          !loginList.includes(val.replace(/[.,/*+;'"_-]/g, ""))
        );
      })
      .test("unique-login", "CPF inválido!", function (val) {
        return val === undefined ? "" : validateCPF(val);
      }),
    password: yup
      .string("Escreva uma senha")
      .min(8, "Senha deve ter no minimo 8 digitos!")
      .required("Preencha a senha"),
    confirmPassword: yup
      .string()
      .required("Confirme a senha digitada!")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("password")],
            "Senha diferente da escrita anteriormente!"
          ),
      }),
  });

  const formikDoctor = useFormik({
    initialValues: {
      full_name: typeModal === "register" ? "" : user.full_name,
      specialty: typeModal === "register" ? "" : user.specialty,
      login: typeModal === "register" ? "" : user.login,
      password: typeModal === "register" ? "" : user.hashed_password,
      confirmPassword: typeModal === "register" ? "" : user.hashed_password,
    },
    validationSchema: validationSchemaDoctor,
    onSubmit: (values) => {
      if(typeModal === "register"){
        handleAdd("Médicos", values);
        setSuccess(true); /*snackbar */
      }else{
        handleEdit("Médicos", values, user.id);
      }
      
      handleClose();
    },
  });

  return (
    <div ref={ref} className={classes.paper} style={modalStyle}>
      <div className={styles.modalImage}>
        <img src="/img/2368528.jpg" alt="medical"></img>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.modalHeaderDoctor}>
          {typeModal === "register" ? (
            <p className={styles.mainTextDoctor}>
              Cadastrar Novo <span>Médico</span>
            </p>
          ) : (
            <p className={styles.mainTextDoctor}>
              Editar <span>Médico</span>
            </p>
          )}
        </div>
        <form className={styles.modalForm} onSubmit={formikDoctor.handleSubmit}>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            fullWidth
            id="full_name"
            name="full_name"
            label="Nome Completo"
            value={formikDoctor.values.full_name}
            onChange={formikDoctor.handleChange}
            error={
              formikDoctor.touched.full_name &&
              Boolean(formikDoctor.errors.full_name)
            }
            helperText={
              formikDoctor.touched.full_name && formikDoctor.errors.full_name
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="specialty"
            name="specialty"
            label="Especialidade"
            value={formikDoctor.values.specialty}
            onChange={formikDoctor.handleChange}
            error={
              formikDoctor.touched.specialty &&
              Boolean(formikDoctor.errors.specialty)
            }
            helperText={
              formikDoctor.touched.specialty && formikDoctor.errors.specialty
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login"
            name="login"
            label="Login(CPF)"
            type="login"
            value={formikDoctor.values.login}
            onChange={formikDoctor.handleChange}
            error={
              formikDoctor.touched.login && Boolean(formikDoctor.errors.login)
            }
            helperText={formikDoctor.touched.login && formikDoctor.errors.login}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Senha"
            type={!visiblePasswd ? "password" : "text"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {visiblePasswd === true ? (
                    <VisibilityIcon
                      style={{ color: "var(--blue-text)", cursor: "pointer" }}
                      onClick={() => setVisiblePasswd(false)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ color: "var(--blue-text)", cursor: "pointer" }}
                      onClick={() => setVisiblePasswd(true)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            value={formikDoctor.values.password}
            onChange={formikDoctor.handleChange}
            error={
              formikDoctor.touched.password &&
              Boolean(formikDoctor.errors.password)
            }
            helperText={
              formikDoctor.touched.password && formikDoctor.errors.password
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar Senha"
            type={!visiblePasswd ? "password" : "text"}
            value={formikDoctor.values.confirmPassword}
            onChange={formikDoctor.handleChange}
            error={
              formikDoctor.touched.confirmPassword &&
              Boolean(formikDoctor.errors.confirmPassword)
            }
            helperText={
              formikDoctor.touched.confirmPassword &&
              formikDoctor.errors.confirmPassword
            }
          />
          <Button
            className={classes.submit}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            {typeModal === "register" ? 'Cadastrar' : 'Salvar'} 
          </Button>
        </form>
      </div>
    </div>
  );
});

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
