/* eslint-disable no-unused-vars */
import React from 'react';
import DragAndDropUploader from 'components/UI/ImageUploader/DragAndDropUploader';

export const PhotoUploadComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // các values, setXXXX, handleXXXX, dirty-formik, isValid, status, etc,
  ...props
}) => {
  const onChange = (value) => {
    form.setFieldValue(field.name, value);
  };
  return (
    <DragAndDropUploader
      name={field ? field.name : 'hotelPhotos'}
      value={field ? field.value : []}
      onUploadChange={onChange}
    />
  );
};
