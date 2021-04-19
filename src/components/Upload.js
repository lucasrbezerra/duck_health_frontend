import React, { useState } from "react";
import styles from "../styles/components/Upload.module.css";
import DateFnsUtils from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import * as yup from "yup";
import { Formik } from "formik";
import { useDropzone } from "react-dropzone";

export default function Upload(props) {
  const handleSubmit = (e) => {
    console.log("submit", e.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <h1>Carregar Novo Laudo</h1>
      </header>
      <main className={styles.body}>
        <Formik
          initialValues={{ files: null, title: "" }}
          onSubmit={(values) => {
            console.log({
              files: values.files.map((file) => ({
                fileName: file.name,
                type: file.type,
                size: `${file.size} bytes`,
              })),
              title: values.title,
            });
          }}
          validationSchema={yup.object().shape({
            files: yup.mixed().required(),
          })}
          render={({ values, handleSubmit, setFieldValue, handleChange }) => {
            return (
              <form className={styles.formContent} onSubmit={handleSubmit}>
                <UploadComponent setFieldValue={setFieldValue} />
                <div className={styles.formsReport}>
                  <input
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/mm/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
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
