import React, { useState } from 'react';
import Radio from 'components/UI/Antd/Radio/Radio';
import DragAndDropUploader from 'components/UI/ImageUploader/DragAndDropUploader';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import Text from 'components/UI/Text/Text';
import { v4 as uuidv4 } from 'uuid';

export const RadioGroupComp = ({ field, form, ...props }) => {
  const { dataOptions } = props;

  const onChangeValue = (checkedValue) => {
    form.setFieldValue(field.name, checkedValue.target.value);
  };

  return (
    <>
      <Radio.Group onChange={onChangeValue}>
        {dataOptions
          && dataOptions.map((single) => (
            <Radio.Button key={uuidv4()} value={single.value}>
              {single.label}
            </Radio.Button>
          ))}
      </Radio.Group>
      {form.touched[field.name] && form.errors[field.name] && (
        <Text content={form.errors[field.name]} color="red" />
      )}
    </>
  );
};

// eslint-disable-next-line no-unused-vars
export const PhotoUploadComponent = ({ field, form, ...props }) => {
  const onChange = (value) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <>
      <DragAndDropUploader
        name={field ? field.name : 'reviewPhotos'}
        value={field ? field.value : []}
        onUploadChange={onChange}
      />
      {form.touched[field.name] && form.errors[field.name] && (
        <Text content={form.errors[field.name]} color="red" />
      )}
    </>
  );
};

export const CheckBoxComp = ({ field, form, ...props }) => {
  const [checkedValue, setCheckedValue] = useState(false);
  const { checkBoxContent } = props;

  const onChange = () => {
    setCheckedValue(!checkedValue);
    form.setFieldValue(field.name, checkedValue);
  };

  return (
    <>
      <Checkbox onChange={onChange}>
        {checkBoxContent || ''}
      </Checkbox>
      {form.touched[field.name] && form.errors[field.name] && (
        <Text content={form.errors[field.name]} color="red" />
      )}
    </>
  );
};
