import React, { useState, forwardRef, useRef } from "react";
import styles from "../styles/components/AdminList.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Modal,
  DialogContent,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FlipMove from "react-flip-move";

export default function AdminList(props) {
  const { data, title, handleAdd, deleteUser, getLoginList, filterBy } = props;

  const [openModal, setModalOpen] = useState(false);
  const [loginList, setLoginList] = useState([]);
  const [success, setSuccess] = useState(false);

  const refCard = useRef(null);

  async function convertJson() {
    const json = await getLoginList();
    var vet = [];
    for (var i in json) {
      vet.push(json[i].login);
    }
    setLoginList(vet);
  };

  const handleOpen = async () => {
    await convertJson();
    setModalOpen(true);
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
          setSuccess={setSuccess}
        />
      </header>
      <main style={{ position: "relative" }} className={styles.listContainer}>
        <FlipMove>
          {data
            .filter((item) => {
              return item.full_name
                .toLowerCase()
                .includes(filterBy.toLowerCase());
            })
            .map(function (item, index) {
              return (
                <Card
                  key={index}
                  id={item.id}
                  type={item.user_class}
                  full_name={item.full_name}
                  subtitle={
                    title === "Médicos" ? item.specialty : formatCPF(item.login)
                  }
                  deleteUser={deleteUser}
                  size={data.length}
                  ref={refCard}
                />
              );
            })}
        </FlipMove>
      </main>
      <Snackbar open={success} autoHideDuration={4500} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Sucesso ao cadastrar um novo {title === "Médicos" ? "Médico" : "Paciente"}!
        </Alert>
      </Snackbar>
    </div>
  );
}

const RegisterModal = (props) => {
  const { title, open, handleClose, handleAdd, loginList, setSuccess } = props;
  const [modalStyle] = useState(getModalStyle);

  const modalRef = useRef(null);

  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose}>
      {title === "Pacientes" ? (
        <DialogContent>
          <ModalPatient
            classes={classes}
            modalStyle={modalStyle}
            handleAdd={handleAdd}
            handleClose={handleClose}
            loginList={loginList}
            setSuccess={setSuccess}
            ref={modalRef}
          />
        </DialogContent>
      ) : (
        <DialogContent>
          <ModalDoctor
            classes={classes}
            modalStyle={modalStyle}
            handleAdd={handleAdd}
            handleClose={handleClose}
            loginList={loginList}
            setSuccess={setSuccess}
            ref={modalRef}
          />
        </DialogContent>
      )}
    </Modal>
  );
};

const ModalPatient = forwardRef((props, ref) => {
  const { classes, modalStyle, handleAdd, handleClose, loginList, setSuccess } = props;
  const [visiblePasswd, setVisiblePasswd] = useState(false);

  const validationSchemaPatient = yup.object({
    full_name: yup
      .string("Escreva seu nome completo")
      .required("Preencha o nome completo"),
    login: yup
      .string("Escreva seu CPF")
      .min(11, "Número de CPF inválido!")
      .required("Preencha com o CPF")
      .test("cpf-format", "Este CPF já foi cadastrado!", function (val) {
        return (
          val !== undefined &&
          !loginList.includes(val.replace(/[.,/*+;'"_-]/g, ""))
        );
      })
      .test("unique-login", "CPF inválido", function (val) {
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
      setSuccess(true); /*snackbar */
    },
  });

  return (
    <div ref={ref} className={classes.paper} style={modalStyle}>
      <div className={styles.modalImage}>
        <img src="/img/doctor.jpg" alt="patient"></img>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.modalHeaderPatient}>
          <p className={styles.mainTextPatient}>
            Cadastrar Novo{" "}
            <span className={styles.spanTextPatient}>Paciente</span>
          </p>
        </div>
        <form
          className={styles.modalForm}
          onSubmit={formikPatient.handleSubmit}
        >
          <TextField
            autoFocus
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
            type={!visiblePasswd ? "password" : "text"}
            value={formikPatient.values.password}
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
            type={!visiblePasswd ? "password" : "text"}
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
  const { classes, modalStyle, handleAdd, handleClose, loginList, setSuccess } = props;
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
      setSuccess(true); /*snackbar */
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
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
});

const Card = forwardRef((props, ref) => {
  const { id, type, full_name, subtitle, deleteUser, size } = props;
  return (
    <div
      onClick={() => console.log(`id: ${id}`)}
      className={size <= 5 ? styles.cardContent : styles.cardContentResize}
      ref={ref}
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
});

/* Funções Auxiliares */
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

function formatCPF(cpf) {
  const formatedCPF =
    cpf.substr(0, 3) +
    "." +
    cpf.substr(3, 3) +
    "." +
    cpf.substr(6, 3) +
    "-" +
    cpf.substr(9, 2);

  return formatedCPF;
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
