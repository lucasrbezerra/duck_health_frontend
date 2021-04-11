import React, { useState, forwardRef, useRef } from "react";
import styles from "../styles/components/AdminList.module.css";

import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function AdminList(props) {
  const { data, title, handleAdd, deleteUser, getLoginList } = props;

  const [openModal, setModalOpen] = useState(false);
  const [loginList, setLoginList] = useState([]);

  async function convertJson() {
    const json = await getLoginList();
    json.map((item) => setLoginList([...loginList, item.login]));
  }

  const handleOpen = async () => {
    setModalOpen(true);
    await convertJson();
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div className={styles.info}>
          {title === "Pacientes" ? (
            <img src="/img/patient.png" alt="paciente"></img>
          ) : (
            <img src="/img/doctor.png" alt="médico"></img>
          )}
          <h2>Lista de {title}</h2>
        </div>

        <button onClick={handleOpen} className={styles.add}>
          <i className="fas fa-plus"></i>
        </button>

        <RegisterModal
          title={title}
          open={openModal}
          handleClose={handleClose}
          handleAdd={handleAdd}
          loginList={loginList}
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

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    width: "70%",
    height: "80%",
    position: "absolute",
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    marginTop: "1rem",
    backgroundColor: "var(--blue-text)",
  },
}));

const RegisterModal = (props) => {
  const { title, open, handleClose, handleAdd, loginList } = props;
  const [modalStyle] = useState(getModalStyle);

  const modalRef = useRef(null);

  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose}>
      {title === "Pacientes" ? (
        <ModalPatient
          classes={classes}
          modalStyle={modalStyle}
          handleAdd={handleAdd}
          handleClose={handleClose}
          loginList={loginList}
          ref={modalRef}
        />
      ) : (
        <ModalDoctor
          classes={classes}
          modalStyle={modalStyle}
          handleAdd={handleAdd}
          handleClose={handleClose}
          loginList={loginList}
          ref={modalRef}
        />
      )}
    </Modal>
  );
};

const ModalPatient = forwardRef((props, ref) => {
  const { classes, modalStyle, handleAdd, handleClose, loginList } = props;

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

  const formikPatient = useFormik({
    initialValues: {
      full_name: "",
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaPatient,
    onSubmit: (values) => {
      handleAdd("Pacientes", values);
      handleClose();
    },
  });

  return (
    <div ref={ref} className={classes.paper} style={modalStyle}>
      <div className={styles.modalImage}>
        <img src="/img/doctor.jpg" alt="patient"></img>
      </div>
      <div className={styles.modalContent}>
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
              formikPatient.touched.full_name && formikPatient.errors.full_name
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
              formikPatient.touched.login && Boolean(formikPatient.errors.login)
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
              formikPatient.touched.password && formikPatient.errors.password
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
            className={classes.submit}
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
  );
});

const ModalDoctor = forwardRef((props, ref) => {
  const { classes, modalStyle, handleAdd, handleClose, loginList } = props;

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
      .required("Preencha com o CPF")
      .notOneOf(loginList, "CPF já cadastrado!"),
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
      handleAdd("Médicos", values);
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
          <p className={styles.mainTextDoctor}>
            Cadastrar Novo <span>Médico</span>
          </p>
        </div>
        <form className={styles.modalForm} onSubmit={formikDoctor.handleSubmit}>
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
            className={classes.submit}
            //disabled={!(formikDoctor.isValid)}
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
  );
});

const Card = ({ id, type, full_name, subtitle, deleteUser }) => {
  return (
    <div
      onClick={() => console.log(`id: ${id}`)}
      className={styles.cardContent}
    >
      <div className={styles.profileData}>
        <h2>{full_name}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.buttons}>
        <button type="submit " onClick={() => console.log(`edit ${full_name}`)}>
          <i className="far fa-edit"></i>
        </button>
        <button type="submit" onClick={() => deleteUser(type, id)}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};
