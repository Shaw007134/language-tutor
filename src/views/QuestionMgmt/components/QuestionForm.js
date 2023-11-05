// QuestionForm.js
import React, { useState, useEffect } from "react";
import { Form, Input, Select, InputNumber, Button } from "antd";

const { Option } = Select;

const QuestionForm = ({ initialValues, onSave, taskTypes }) => {
  const defaultFormValues = {
    id: null,
    taskType: "",
    title: "",
    content: "",
    preparationTime: 0,
    selectionTime: 0,
    recordingTime: 0,
    images: "",
    descs: "",
    audio: "",
  };

  const [form, setForm] = useState(defaultFormValues);

  useEffect(() => {
    const valuesToUse = initialValues || defaultFormValues;
    const filteredValues = Object.fromEntries(
      Object.entries(valuesToUse).filter(
        ([key, value]) =>
          key in defaultFormValues && value != null && value !== ""
      )
    );
    setForm(filteredValues);
  }, [initialValues]);

  const handleFormChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Form layout="vertical" style={{ maxWidth: "600px", margin: "auto" }}>
      <Form.Item label="Task Type">
        <Select
          value={form.taskType}
          onChange={(value) => handleFormChange("taskType", value)}
          style={{ width: "100%" }}
        >
          {taskTypes.map((type) => (
            <Option key={type.value} value={type.value}>
              {type.desc}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Title">
        <Input
          value={form.title}
          onChange={(e) => handleFormChange("title", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Content">
        <Input
          value={form.content}
          onChange={(e) => handleFormChange("content", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Preparation Time">
        <InputNumber
          value={form.preparationTime}
          onChange={(value) => handleFormChange("preparationTime", value)}
        />
      </Form.Item>
      <Form.Item label="Selection Time">
        <InputNumber
          value={form.selectionTime}
          onChange={(value) => handleFormChange("selectionTime", value)}
        />
      </Form.Item>
      <Form.Item label="Recording Time">
        <InputNumber
          value={form.recordingTime}
          onChange={(value) => handleFormChange("recordingTime", value)}
        />
      </Form.Item>
      <Form.Item label="Images">
        <Input
          value={form.images}
          onChange={(e) => handleFormChange("images", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Descriptions">
        <Input
          value={form.descs}
          onChange={(e) => handleFormChange("descs", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Audio">
        <Input
          value={form.audio}
          onChange={(e) => handleFormChange("audio", e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
