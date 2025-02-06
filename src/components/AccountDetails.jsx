import { Form, Input, Button, notification, Upload, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TitleSection from "../Shared/TitleSection";
import { useUpdateUserMutation, useShowSingleUserQuery } from "../app/Api/Users";
import { useTranslation } from "react-i18next";

const AccountDetails = () => {
  const [form] = Form.useForm();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: SingleUser, isLoading: isLoadingUser  , refetch} = useShowSingleUserQuery();
  const { i18n } = useTranslation();

  if (isLoadingUser) {
    return <Spin size="large" style={{ display: "block", margin: "auto", padding: "20px" }} />;
  }

  const initialValues = {
    name: SingleUser?.user?.name || "",
    phone: SingleUser?.user?.phone || "",
    country: SingleUser?.user?.country || "",
    city: SingleUser?.user?.city || "",
    image: SingleUser?.user?.image || "",
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("country", 'a');
    formData.append("city", 'm');
    if (values.profilePicture?.[0]?.originFileObj) {
      formData.append("image", values.profilePicture[0].originFileObj);
    }

    try {
      await updateUser(formData).unwrap();
      notification.success({
        message: i18n.language==="EN"?"Success":"نجاح",
        description: i18n.language==="EN"?"Your account details have been updated.":"تم تحديث تفاصيل حسابك.",
      });
      refetch()
    } catch (error) {
      notification.error({
        message: i18n.language==="EN"?"Update Failed":"فشل التحديث",
        description: error?.data?.message || "",
      });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      <TitleSection title={i18n.language==="EN"?"Account Details":"تفاصيل الحساب"} />
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item label={i18n.language==="EN"?"Name":"الاسم"} name="name" rules={[{ required: true, message:i18n.language==="EN"? "Please enter your name":"الرجاء إدخال اسمك" }]}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label={i18n.language==="EN"?"Phone Number":"رقم التليفون"}
          name="phone"
          rules={[{ required: true, message: i18n.language==="EN"?"Please enter your phone number":"الرجاء إدخال رقم هاتفك" }]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item label="Profile Picture" name="profilePicture" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload style={{maxWidth:'250px'}} name="profile" listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>{i18n.language==="EN"?"Upload Profile Picture":"تحميل صورة الملف الشخصي"}</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isUpdating}>
            {i18n.language==="EN"?"Update Details":"تحديث التفاصيل"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountDetails;
