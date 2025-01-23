import { Form, Input, Button, Row, Col, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TitleSection from "../Shared/TitleSection";

const AccountDetails = () => {
  const [form] = Form.useForm();

  const initialValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    country: "USA",
    city: "New York",
  };

  const onFinish = (values) => {
    notification.success({
      message: "Success",
      description: "Your account details have been updated.",
    });
    console.log("Form Values: ", values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div style={{ padding: "20px", margin: "auto"}}>
      <TitleSection title="Account Details" />
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please enter your country" }]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Profile Picture"
          name="profilePicture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload your profile picture" }]}
        >
          <Upload
            name="profile"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="banner-button">
            Update Details
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountDetails;
