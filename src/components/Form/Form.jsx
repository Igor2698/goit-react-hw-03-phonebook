import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import {
  StyledForm,
  Label,
  StyledField,
  ErrorMsg,
  InputContainer,
  ButtonForm,
} from './Form.styled';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed')
    .min(2, 'Too Short!')
    .required('This field is required, please fill that'),
  number: Yup.string()
    .matches(
      /^\+380[-\s\d]*$/,
      'Must start with +380'
    )
    .min(12, 'Too Short!')
    .required('This field is required, please fill that'),
});

const MyForm = ({ onSubmit }) => {
  const handleNumberChange = e => {
    const inputText = e.target.value;

    // Проверяем, что пользователь не удаляет символ "+"
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '+380 00 123 45 67',
      }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <InputContainer>
          <StyledField type="text" name="name" placeholder="Alex Repeta" />
          <Label htmlFor="name">Please enter a name:</Label>

          <ErrorMsg name="name" component="div" />
        </InputContainer>
        <InputContainer>
          <StyledField type="tel" name="number" />
          <Label htmlFor="number">Please enter a number:</Label>

          <ErrorMsg name="number" component="div" />
        </InputContainer>

        <ButtonForm type="submit">Add contact</ButtonForm>
      </StyledForm>
    </Formik>
  );
};

export default MyForm;

MyForm.propTypes = {
  onSubmit: PropTypes.func,
};
