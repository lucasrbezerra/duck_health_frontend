import React, { useState } from "react";
import styles from "../styles/components/Upload.module.css";
import * as yup from "yup";
import { Formik } from "formik";
import { useDropzone } from "react-dropzone";
import TextField from "@material-ui/core/TextField";

export default function Upload(props) {
  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <h1>Carregar Novo Laudo</h1>
      </header>
      <main className={styles.body}>
        <Formik
          initialValues={{ files: null, title: "", date: null }}
          onSubmit={(values) => {
            console.log({
              files: values.files.map((file) => ({
                fileName: file.name,
              })),
              title: values.title,
              date: values.date,
            });
          }}
          validationSchema={yup.object().shape({
            files: yup.mixed().required(),
          })}
          render={({ values, handleSubmit, setFieldValue, handleChange }) => {
            return (
              <form
                className={styles.formContent}
                onSubmit={handleSubmit}
                noValidate
              >
                <UploadComponent setFieldValue={setFieldValue} />
                <div className={styles.formsReport}>
                  <TextField
                    id="title"
                    variant="outlined"
                    margin="normal"
                    className={styles.fieldTitle}
                    name="title"
                    label="Título"
                    value={values.title}
                    onChange={handleChange}
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
                    />
                    <button type="submit" className={styles.submit}>
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        />
      </main>
    </div>
  );
}

const UploadComponent = (props) => {
  const [fileNames, setFileNames] = useState([]);
  const [isDroped, setIsDroped] = useState(false);
  const { setFieldValue } = props;
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
          <input {...getInputProps()} />
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
};
