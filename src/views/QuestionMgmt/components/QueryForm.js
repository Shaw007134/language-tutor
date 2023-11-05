import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Row, Col } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const QueryForm = ({ onSearch, taskTypes }) => {
  const [form, setForm] = useState({
    taskType: "",
    title: "",
    content: "",
    dateRange: [],
  });

  const handleFormChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSearch = () => {
    onSearch(form);
  };

  return (
    <Form layout="vertical">
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="Task Type">
            <Select
              value={form.taskType}
              onChange={(value) => handleFormChange("taskType", value)}
            >
              {taskTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.desc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Title">
            <Input
              value={form.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Content">
            <Input
              value={form.content}
              onChange={(e) => handleFormChange("content", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="Date Range">
            <RangePicker
              value={form.dateRange}
              onChange={(value) => handleFormChange("dateRange", value)}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleSearch}
              style={{ marginTop: "29px" }}
            >
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default QueryForm;
