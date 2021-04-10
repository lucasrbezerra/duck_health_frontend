import React, { useState } from "react";
import styles from "../styles/components/AdminList.module.css";
import Modal from "react-modal";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function AdminList(props) {
  const { data, title, handleAdd, deleteUser } = props;

  const [openModal, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(!openModal);
  };

  const customStyles = {
    content: {
      width: "60%",
      height: "70%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div className={styles.info}>
          <img src="/img/patient.png" alt="paciente"></img>
          <h2>Lista de {title}</h2>
        </div>
        <button onClick={handleOpenModal} className={styles.add}>
          <i className="fas fa-plus"></i>
        </button>
        <RegisterModal
          openModal={openModal}
          customStyles={customStyles}
          title={title}
        />
      </header>
      <main className={styles.listContainer}>
        {data.map(function (item, index) {
          return (
            <Card
              key={index}
              id={item.id}
              type={item.user_class}
              full_name={item.full_name}
              subtitle={title === "Médicos" ? item.specialty : item.login}
              deleteUser={deleteUser}
            />
          );
        })}
      </main>
    </div>
  );
}

const RegisterModal = ({ openModal, customStyles, title }) => {
  const validationSchemaPatient = yup.object({
    full_name: yup
      .string("Escrava seu nome completo")
      .required("Preencha o nome completo"),
    login: yup
      .string("Escrava seu CPF")
      .min(11, "Número de CPF inválido!")
      .required("Preencha com o CPF"),
    password: yup
      .string("Escreva uma senha")
      .min(8, "Senha deve ter no minimo 8 digitos!")
      .required("Preencha a senha"),
    confirmPassword: yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "Senha diferente da escrita anteriormente!"
        ),
    }),
  });

  const validationSchemaDoctor = yup.object({
    full_name: yup
      .string("Escrava seu nome completo")
      .required("Preencha o nome completo"),
    specialty: yup
      .string("Escrava a especialidade do médico!")
      .required("Preencha a especialidade do médico"),
    login: yup
      .string("Escrava seu CPF")
      .min(11, "Número de CPF inválido!")
      .required("Preencha com o CPF"),
    password: yup
      .string("Escreva uma senha")
      .min(8, "Senha deve ter no minimo 8 digitos!")
      .required("Preencha a senha"),
    confirmPassword: yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "Senha diferente da escrita anteriormente!"
        ),
    }),
  });

  const formikPatient = useFormik({
    initialValues: {
      full_name: "",
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaPatient,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const formikDoctor = useFormik({
    initialValues: {
      full_name: "",
      specialty: "",
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaDoctor,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Modal ariaHideApp={false} isOpen={openModal} style={customStyles}>
      {title === "Pacientes" ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalImage}>
            <img src="/img/doctor.jpg"></img>
          </div>
          <div className={styles.paper}>
            <div className={styles.modalHeaderPatient}>
              <p className={styles.mainTextPatient}>Cadastrar Novo</p>
              <p className={styles.spanTextPatient}>Paciente</p>
            </div>
            <form
              className={styles.modalForm}
              onSubmit={formikPatient.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="full_name"
                name="full_name"
                label="Nome Completo"
                value={formikPatient.values.full_name}
                onChange={formikPatient.handleChange}
                error={
                  formikPatient.touched.full_name &&
                  Boolean(formikPatient.errors.full_name)
                }
                helperText={
                  formikPatient.touched.full_name &&
                  formikPatient.errors.full_name
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
                value={formikPatient.values.login}
                onChange={formikPatient.handleChange}
                error={
                  formikPatient.touched.login &&
                  Boolean(formikPatient.errors.login)
                }
                helperText={
                  formikPatient.touched.login && formikPatient.errors.login
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={formikPatient.values.password}
                onChange={formikPatient.handleChange}
                error={
                  formikPatient.touched.password &&
                  Boolean(formikPatient.errors.password)
                }
                helperText={
                  formikPatient.touched.password &&
                  formikPatient.errors.password
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                value={formikPatient.values.confirmPassword}
                onChange={formikPatient.handleChange}
                error={
                  formikPatient.touched.confirmPassword &&
                  Boolean(formikPatient.errors.confirmPassword)
                }
                helperText={
                  formikPatient.touched.confirmPassword &&
                  formikPatient.errors.confirmPassword
                }
              />
              <Button
                className={styles.submit}
                color="primary"
                variant="contained"
                fullWidth
                size="large"
                type="submit"
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.modalContainer}>
          <div className={styles.modalImage}>
            <img src="/img/2368528.jpg"></img>
          </div>
          <div className={styles.paper}>
            <div className={styles.modalHeaderDoctor}>
              <p className={styles.mainTextDoctor}>
                Cadastrar Novo <span>Médicos</span>
              </p>
            </div>
            <form
              className={styles.modalForm}
              onSubmit={formikDoctor.handleSubmit}
            >
              <TextField
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
                  formikDoctor.touched.full_name &&
                  formikDoctor.errors.full_name
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
                  formikDoctor.touched.specialty &&
                  formikDoctor.errors.specialty
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
                  formikDoctor.touched.login &&
                  Boolean(formikDoctor.errors.login)
                }
                helperText={
                  formikDoctor.touched.login && formikDoctor.errors.login
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                name="password"
                label="Senha"
                type="password"
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
                type="password"
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
                className={styles.submit}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};

const Card = ({ id, type, full_name, subtitle, deleteUser }) => {
  return (
    <div
      onClick={() => console.log(`card of ${id}`)}
      className={styles.cardContent}
    >
      <div className={styles.profileData}>
        <h2>{full_name}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => console.log(`edit ${full_name}`)}>
          <i className="far fa-edit"></i>
        </button>
        <button onClick={() => deleteUser(type, id)}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};
