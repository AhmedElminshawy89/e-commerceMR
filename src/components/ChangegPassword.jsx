import { Form, Input, Button, notification } from "antd";
import TitleSection from "../Shared/TitleSection";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Error",
        description: "The new password and confirmation do not match.",
      });
      return;
    }

    notification.success({
      message: "Password Updated",
      description: "Your password has been successfully updated.",
    });
    console.log("Password Update Data: ", values);
  };

  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      <TitleSection title="Change Password" />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ margin: "auto" }}
      >
        {/* <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item> */}

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter a new password" },
            { min: 8, message: "Password must be at least 8 characters long" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your new password" },
            { min: 8, message: "Password must be at least 8 characters long" },
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="banner-button">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
