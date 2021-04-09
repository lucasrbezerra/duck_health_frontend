import React, { useState } from "react";
import styles from "../styles/components/AdminList.module.css";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
//import api from "../services/api";
//import { AdminContext } from '../contexts/AdminContext';

export default function AdminList(props) {
  const { data, title, handleAdd, deleteUser } = props;
  const [openModal, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
        <Modal isOpen={openModal} style={customStyles}>
          <div className={styles.modalContent}>
            <img
              className={styles.imageContent}
              src="/img/2368528.jpg"
              alt="image patient"
            ></img>
            <div className={styles.formContent}>
              <div className={styles.headerModal}>
                <p className={styles.mainText}>Cadastrar Novo</p>
                {title === "Médicos" ? (
                  <p className={styles.spanText}>Médico</p>
                ) : (
                  <p className={styles.spanText}>Paciente</p>
                )}
              </div>
              <div className={styles.bodyForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    placeholder="Nome Completo"
                    className={styles.inputs}
                    {...register("fullNameValue")}
                  />
                  <input
                    placeholder="CPF"
                    className={styles.inputs}
                    {...register("loginValue")}
                  />
                  <input
                    className={styles.inputs}
                    placeholder="Senha"
                    {...register("password")}
                  />
                  <input
                    className={styles.inputs}
                    placeholder="Confirmar Senha"
                    {...register("confirmPassword")}
                  />
                  <input
                    type="submit"
                    className={styles.buttonSubmit}
                    value="Cadastrar"
                  />
                </form>
              </div>
            </div>
          </div>
        </Modal>
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
