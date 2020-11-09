import { useState } from 'react';
import styles from '../styles/Search.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

export const Search = () => {
  const [data, setData] = useState({})

  async function getUser ({username}) {
    const config = {
      method: 'GET',
      mode: 'no-cors',
    };
    const url = `https://torre.bio/api/bios/${username}`  
    const myRequest = new Request(url, config);
    const response = await fetch(myRequest);
    const user = await response.json()
    setData(user);
    console.log(data);
  }

  return(
    <>
      <Formik
        initialValues={{ username: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Please type a username';
          }
          return errors;
        }}
        onSubmit={async (value, { setSubmitting }) => {
          await getUser(value);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form data-testid="search-form" className={styles.form}>
            <div className={styles.input}>
              <Field
                className={styles.field}
                placeholder="Busca por username"
                type="text"
                name="username"
                disabled={isSubmitting}
              />
              <button
                data-testid="button-submit"
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
                >
                Buscar
              </button>
            </div>
            <ErrorMessage 
              name="username"
              component="span"
              className={styles.error}
            />
          </Form>
        )}
      </Formik>
    </>
  )
}
