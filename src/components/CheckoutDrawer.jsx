/* eslint-disable react/prop-types */
import { Drawer, Form, Input, Radio, Button, notification, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useSavePaymentCashOnDeliveryMutation, useSavePaymentPayMobMutation } from "../app/Api/Payments";
import { useShowSingleUserQuery } from "../app/Api/Users";

const CheckoutDrawer = ({ visible, onClose ,amount_cents,
    discount,
    before_discount,
    type_user,
    cartItems}) => {
  const { t } = useTranslation();
  
  const storedRef = localStorage.getItem('ref');
  const [savePaymob , {isLoading }] = useSavePaymentPayMobMutation()
  const [saveCashOnDelivery, {isLoading:loadingCash}] = useSavePaymentCashOnDeliveryMutation()
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  const cartItemsData = token ? cartItems || [] : JSON.parse(localStorage.getItem("cart")) || [];
  // const { refetch } = useShowCartQuery(null, { skip: !token });
  const { data: SingleUser} = useShowSingleUserQuery()
  const items = cartItemsData.map((item) => ({
    name: token ? item.product.name : item.product_name,
    amount_cents: token 
      ? item.product.price_discount 
      : item.product_price,
    quantity: item.quantity,
    color: item.color,
    size: item.size,
    description: item.desc,
  }));
  const handlePlaceOrder = async (values) => {
  
    // if (!token && values.payment_method === "paymob") {
    //   window.location.href = "/login";
    //   return;
    // }
  
    const requestData = {
      amount_cents: amount_cents * 100,
      currency: "EGP",
      discount: discount * 100,
      before_discount: before_discount * 100,
      userId: SingleUser?.user?.id || null,
      codeUser: storedRef,
      type_user,
      shipping_data: {
        ...values,
      },
      items,
    };
  
    try {
      if (values.payment_method === "paymob") {
        const response = await savePaymob(requestData).unwrap();
        notification.success({
          message: t("Order Placed"),
          description: t("Your PayMob payment was successful."),
        });
        setTimeout(() => {
          if (response?.url?.url) {
            localStorage.removeItem("cart");
            localStorage.removeItem("cartLength");
            window.open(response.url.url, '_self');
          } else {
            notification.error({
              message: t("Invalid Response"),
              description: t("PayMob did not return a valid URL."),
            });
          }
        }, 2000);
        // refetch();
      } else if (values.payment_method === "cash_on_delivery") {
        await saveCashOnDelivery(requestData).unwrap();
        notification.success({
          message: t("Order Placed"),
          description: t("Your order for Cash on Delivery has been placed."),
        });
        localStorage.removeItem("cart");
        localStorage.removeItem("cartLength");  
        window.location.reload();
      } else {
        throw new Error(t("Invalid payment method."));
      }
      onClose();
    } catch (error) {
      notification.error({
        message: t("Error"),
        description: error.message || t("Something went wrong, please try again."),
      });
    }
  };
  
  

  return (
    <Drawer
      title={t("Checkout")}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
    >
      <Form
        layout="vertical"
        onFinish={handlePlaceOrder} 
      >
        <Form.Item
          label={t("Payment Method")}
          name="payment_method"
          rules={[
            {
              required: true,
              message: t("Please select a payment method."),
            },
          ]}
        >
          <Radio.Group
            buttonStyle="solid"
            style={{ display: "flex", gap: "10px" }}
          >
            <Radio.Button
              value="cash_on_delivery"
              style={{
                border: "2px solid #d9d9d9",
                borderRadius: "8px",
                textAlign: "center",
                flex: 1,
                fontWeight: "bold",
              }}
            >
              {t("Cash on Delivery")}
            </Radio.Button>
            <Radio.Button
              value="paymob"
              style={{
                border: "2px solid #d9d9d9",
                borderRadius: "8px",
                textAlign: "center",
                flex: 1,
                fontWeight: "bold",
              }}
            >
              {t("Paymob")}
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={t("First Name")}
          name="first_name"
          rules={[
            {
              required: true,
              message: t("Please enter your first name."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Last Name")}
          name="last_name"
          rules={[
            {
              required: true,
              message: t("Please enter your last name."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Street")}
          name="street"
          rules={[
            {
              required: true,
              message: t("Please enter your street address."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Building")}
          name="building"
          rules={[
            {
              required: true,
              message: t("Please enter your building number."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Floor")}
          name="floor"
          rules={[
            {
              required: true,
              message: t("Please enter your floor number."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Apartment")}
          name="apartment"
          rules={[
            {
              required: true,
              message: t("Please enter your apartment number."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("City")}
          name="city"
          rules={[
            {
              required: true,
              message: t("Please enter your city."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("State")}
          name="state"
          rules={[
            {
              required: true,
              message: t("Please enter your state."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Country")}
          name="country"
          rules={[
            {
              required: true,
              message: t("Please enter your country."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Postal Code")}
          name="postal_code"
          rules={[
            {
              required: true,
              message: t("Please enter your postal code."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("Extra Description")} name="extra_description">
          <Input />
        </Form.Item>

        <Form.Item
          label={t("Email")}
          name="email"
          rules={[
            {
              required: true,
              message: t("Please enter your email address."),
            },
            {
              type: "email",
              message: t("Please enter a valid email address."),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Phone Number")}
          name="phone_number"
          rules={[
            {
              required: true,
              message: t("Please enter your phone number."),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          className="banner-button"
          htmlType="submit"
        >
          {t("Place Order")} {isLoading&&<Spin/>} {loadingCash&&<Spin/>}  
        </Button>
      </Form>
    </Drawer>
  );
};

export default CheckoutDrawer;
