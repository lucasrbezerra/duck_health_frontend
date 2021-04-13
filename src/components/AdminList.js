import React, { useState, forwardRef, useRef } from "react";
import styles from "../styles/components/AdminList.module.css";
import { Modal, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import FlipMove from "react-flip-move";
import { ModalPatient } from "./ModalPatient";
import { ModalDoctor } from "./ModalDoctor";

export default function AdminList(props) {
  const { data, title, handleAdd, handleEdit, deleteUser, getLoginList, filterBy } = props;

  const [openModal, setModalOpen] = useState(false);
  const [loginList, setLoginList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [userEdit, setUserEdit] = useState("");
  const refCard = useRef(null);

  async function convertJson() {
    const json = await getLoginList();
    var vet = [];
    for (var i in json) {
      vet.push(json[i].login);
    }
    setLoginList(vet);
  }

  const handleOpen = async () => {
    setTypeModal("register")
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
          handleEdit={handleEdit}
          loginList={loginList}
          typeModal={typeModal}
          setSuccess={setSuccess}
          user={userEdit}
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
                  item={item}
                  subtitle={
                    title === "Médicos" ? item.specialty : formatCPF(item.login)
                  }
                  deleteUser={deleteUser}
                  setTypeModal={setTypeModal}
                  setUserEdit={setUserEdit}
                  handleOpen={() => setModalOpen(true)}
                  size={data.length}
                  ref={refCard}
                />
              );
            })}
        </FlipMove>
      </main>
      <Snackbar
        open={success}
        autoHideDuration={4500}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Sucesso ao cadastrar um novo{" "}
          {title === "Médicos" ? "Médico" : "Paciente"}!
        </Alert>
      </Snackbar>
    </div>
  );
}

const RegisterModal = (props) => {
  const {
    title,
    open,
    handleClose,
    handleAdd,
    handleEdit,
    loginList,
    setSuccess,
    typeModal,
    user
  } = props;
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
            handleEdit={handleEdit}
            handleClose={handleClose}
            loginList={loginList}
            setSuccess={setSuccess}
            typeModal={typeModal}
            user={user}
            ref={modalRef}
          />
        </DialogContent>
      ) : (
        <DialogContent>
          <ModalDoctor
            classes={classes}
            modalStyle={modalStyle}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleClose={handleClose}
            loginList={loginList}
            setSuccess={setSuccess}
            typeModal={typeModal}
            user={user}
            ref={modalRef}
          />
        </DialogContent>
      )}
    </Modal>
  );
};

const Card = forwardRef((props, ref) => {
  const { item , subtitle, deleteUser, size, handleOpen, setTypeModal, setUserEdit } = props;
  
  const onEdit = (item) => {
    setTypeModal("edit");
    setUserEdit(item);
    handleOpen();
  }

  return (
    <div
      onClick={() => console.log(`id: ${item.id}`)}
      className={size <= 5 ? styles.cardContent : styles.cardContentResize}
      ref={ref}
    >
      <div className={styles.profileData}>
        <h2>{item.full_name}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.buttons}>
        <button type="submit " onClick={() => onEdit(item)}>
          <i className="far fa-edit"></i>
        </button>
        <button type="submit" onClick={() => deleteUser(item.user_class, item.id)}>
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
