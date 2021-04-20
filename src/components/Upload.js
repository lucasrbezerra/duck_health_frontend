import React, { useState, forwardRef, useRef } from "react";
import styles from "../styles/components/Upload.module.css";
import * as yup from "yup";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import TextField from "@material-ui/core/TextField";

export default function Upload(props) {
  const { doctorId, patientId, clicked, setClicked, uploadReport } = props;
  const [isDroped, setIsDroped] = useState(false);

  const ref = useRef(null);

  const useStyles = makeStyles({
    fieldTitle: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    error: {
      color: "red",
      margin: "0 1rem",
      borderBottom: "1px solid red",
      padding: "6px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    warning: {
      marginLeft: "0.5rem",
      fontWeight: "600",
    },
  });

  const classes = useStyles();

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <h1>Carregar Novo Laudo</h1>
      </header>
      <main className={styles.body}>
        <Formik
          initialValues={{ files: null, title: "", date: "" }}
          onSubmit={async (values) => {
            await uploadReport(values, doctorId, patientId);
            values.title = "";
            values.files = null;
            values.date = "";
            setClicked(!clicked);
            setIsDroped(false);
          }}
          validationSchema={yup.object().shape({
            files: yup
              .mixed("Coloque Arquivos!")
              .required("Nenhum arquivo selecionado!"),
            title: yup
              .string("Coloque um titulo!")
              .required("Coloque o nome do laudo!"),
            date: yup
              .string("Coloque uma data!")
              .required("Insira a data do exame!"),
          })}
        >
          {({ values, handleSubmit, setFieldValue, handleChange, errors }) => {
            return (
              <form
                className={styles.formContent}
                onSubmit={handleSubmit}
                noValidate
              >
                <UploadComponent
                  setFieldValue={setFieldValue}
                  isDroped={isDroped}
                  setIsDroped={setIsDroped}
                  errors={errors}
                  ref={ref}
                />
                <div className={styles.formsReport}>
                  {Boolean(errors.title) && Boolean(errors.date) && (
                    <div className={classes.error}>
                      <i className="fas fa-exclamation-circle"></i>
                      <p className={classes.warning}>
                        Arquivo, título e data de exame requeridos!
                      </p>
                    </div>
                  )}
                  <TextField
                    id="title"
                    variant="outlined"
                    margin="normal"
                    className={classes.fieldTitle}
                    name="title"
                    label="Título"
                    value={values.title}
                    onChange={handleChange}
                    error={Boolean(errors.title)}
                  />
                  <div className={styles.dateContent}>
                    <TextField
                      id="date"
                      variant="outlined"
                      margin="normal"
                      type="datetime-local"
                      className={styles.fieldDate}
                      name="date"
                      label="Data do Exame"
                      value={values.date}
                      onChange={handleChange}
                      defaultValue={`${Date.now()}`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(errors.date)}
                    />
                    <button type="submit" className={styles.submit}>
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
}

const UploadComponent = forwardRef((props, ref) => {
  const { setFieldValue, errors, isDroped, setIsDroped } = props;
  const [fileNames, setFileNames] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
    onDrop: (acceptedFiles) => {
      setFieldValue("files", acceptedFiles);
      setFileNames(acceptedFiles.map((file) => file.name));
      setIsDroped(true);
    },
  });

  const additionalClass = isDragAccept
    ? `${styles.accept}`
    : isDragReject
    ? `${styles.reject}`
    : "";

  return (
    <div
      ref={ref}
      {...getRootProps({
        className: `${styles.dropzone} ${additionalClass}`,
      })}
    >
      {isDroped ? (
        <div className={styles.item}>
          <div className={styles.headItem}>
            <p>{fileNames}</p>
            <i onClick={() => setIsDroped(false)} className="fas fa-times"></i>
          </div>
          <div className={styles.bodyItem}>
            <i className="fas fa-file-alt"></i>
          </div>
        </div>
      ) : (
        <>
          <input
            {...getInputProps()}
            errors={errors.files}
            encType="multipart/form-data"
          />
          {isDragActive ? (
            <>
              <i className={`fas fa-upload ${styles.icon}`}></i>
              <p>Solte o Arquivo!</p>
            </>
          ) : (
            <>
              <i className={`fas fa-upload ${styles.icon}`}></i>
              <p>Arraste o laudo aqui!</p>
              <p>Ou</p>
              <label className={styles.label}>Clique Aqui</label>
            </>
          )}
        </>
      )}
    </div>
  );
});
