import React, { useState, useEffect } from "react";
import { Layout, Button, Table, Modal, Pagination, Card, Space } from "antd";
import QueryForm from "./components/QueryForm";
import QuestionForm from "./components/QuestionForm";
import api from "@/api/speaking";

const { Header, Content, Footer } = Layout;

const QuestionMgmt = () => {
  const [questions, setQuestions] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!dialogVisible) {
      setCurrentQuestion(null);
      setIsEditing(false);
    }
  }, [dialogVisible]);

  useEffect(() => {
    const fetchTaskTypes = async () => {
      try {
        console.log('fetchTaskTypes')
        const response = await api.getTaskTypes();
        console.log('response', response)
        setTaskTypes(response);
      } catch (error) {
        console.error("Error fetching task types:", error);
      }
    };

    fetchTaskTypes();
  }, []);

  const fetchQuestions = async (query, page, size) => {
    try {
      const response = await api.getQuestions({ ...query, page, size });
      setQuestions(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSearch = (query) => {
    fetchQuestions(query, currentPage, pageSize);
  };

  const handleAddNew = () => {
    setCurrentQuestion(null);
    setIsEditing(false);
    setDialogVisible(true);
  };

  const handleEdit = (question) => {
    setCurrentQuestion(question);
    setIsEditing(true);
    setDialogVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteQuestion(id);
      fetchQuestions(); // Refresh the question list
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleSave = async (question) => {
    try {
      if (isEditing) {
        await api.updateQuestion(question);
      } else {
        await api.addQuestion(question);
      }
      setDialogVisible(false);
      fetchQuestions(); // Refresh the question list
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
    fetchQuestions({}, page, size);
  };

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center", fontSize: "24px" }}>
        Question Management
      </Header>
      <Content style={{ padding: "24px", minHeight: "280px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card>
            <QueryForm onSearch={handleSearch} taskTypes={taskTypes} />
          </Card>
          <Card>
            <Button
              type="primary"
              onClick={handleAddNew}
              style={{ marginBottom: "16px" }}
            >
              Add New Question
            </Button>
            <Table
              columns={[
                {
                  title: "Operations",
                  key: "actions",
                  render: (row) => (
                    <Space size="middle">
                      <Button type="link" onClick={() => handleEdit(row)}>
                        Edit
                      </Button>
                      <Button type="link" onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                    </Space>
                  ),
                },
                { title: "Task Type", dataIndex: "taskType", key: "taskType" },
                { title: "Title", dataIndex: "title", key: "title" },
                { title: "Content", dataIndex: "content", key: "content" },
                {
                  title: "Created At",
                  dataIndex: "createdAt",
                  key: "createdAt",
                },
                {
                  title: "Updated At",
                  dataIndex: "updatedAt",
                  key: "updatedAt",
                },
              ]}
              dataSource={questions}
              pagination={false}
              rowKey="id"
            />
            <Pagination
              total={total}
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
              showSizeChanger
              style={{ textAlign: "right", marginTop: "16px" }}
            />
          </Card>
        </Space>
      </Content>
      <Footer>
        <Modal
          title={isEditing ? "Edit Question" : "Add New Question"}
          visible={dialogVisible}
          onCancel={() => setDialogVisible(false)}
          footer={null}
        >
          <QuestionForm initialValues={currentQuestion} onSave={handleSave} taskTypes={taskTypes} />
        </Modal>
      </Footer>
    </Layout>
  );
};

export default QuestionMgmt;
