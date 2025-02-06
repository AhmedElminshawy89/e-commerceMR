import { Form, Input, Button, notification } from "antd";
import TitleSection from "../Shared/TitleSection";
import { useChangePasswordMutation } from "../app/Api/Users";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [updatePassword, { isLoading }] = useChangePasswordMutation();
  const { i18n } = useTranslation()

  const onFinish = async (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      notification.error({
        message: i18n.language==="EN"?"Error":"خطا",
        description: i18n.language==="EN"?"The new password and confirmation do not match.":"كلمة المرور الجديدة والتأكيد غير متطابقين.",
      });
      return;
    }

    try {
      await updatePassword({ password: newPassword,password_confirmation:confirmPassword}).unwrap();
      notification.success({
        message: i18n.language==="EN"?"Password Updated":"تم تحديث كلمة المرور",
        description: i18n.language==="EN"?"Your password has been successfully updated.":"لقد تم تحديث كلمة المرور الخاصة بك بنجاح.",
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: i18n.language==="EN"?"Error":"خطا",
        description: error?.data?.message || "",
      });
    }
  };

  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      <TitleSection title={i18n.language==="EN"?"Change Password":"تغيير كلمة المرور"} />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={i18n.language==="EN"?"New Password":"كلمة المرور الجديدة"}
          name="newPassword"
          rules={[
            { required: true, message: i18n.language==="EN"?"Please enter a new password":"الرجاء إدخال كلمة مرور جديدة" },
            { min: 8, message: i18n.language==="EN"?"Password must be at least 8 characters long":"يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" },
          ]}
        >
          <Input.Password placeholder={i18n.language==="EN"?"Enter new password":"أدخل كلمة المرور الجديدة"} />
        </Form.Item>

        <Form.Item
          label={i18n.language==="EN"?"Confirm New Password":"تأكيد كلمة المرور الجديدة"}
          name="confirmPassword"
          rules={[
            { required: true, message: i18n.language==="EN"?"Please confirm your new password":"الرجاء تأكيد كلمة المرور الجديدة الخاصة بك" },
            { min: 8, message: i18n.language==="EN"?"Password must be at least 8 characters long":"يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" },
          ]}
        >
          <Input.Password placeholder={i18n.language==="EN"?"Confirm new password":"تأكيد كلمة المرور الجديدة"} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="banner-button" loading={isLoading}>
            {i18n.language==="EN"?"Update Password":"تحديث كلمة المرور"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
