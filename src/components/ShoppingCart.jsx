import { Table, InputNumber, Button, notification} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useMemo, useEffect } from "react";
import "../Style/ShoppingCart.css";
import TitleSection from "../Shared/TitleSection";
import { useShowCartQuery, useUpdateCartMutation, useDelCartMutation } from "../app/Api/Cart";
import { useTranslation } from "react-i18next";
import CheckoutDrawer from "./CheckoutDrawer";
import { useShowDiscountToUserQuery } from "../app/Api/Discount";
import { useShowSingleUserQuery } from "../app/Api/Users";

const ShoppingCart = () => {
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  const [localCart, setLocalCart] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { data: SingleUser} = useShowSingleUserQuery()

  const { data, isLoading, refetch } = useShowCartQuery(null, { skip: !token });
  const [updateCart] = useUpdateCartMutation();
  const [delCart] = useDelCartMutation();
  const storedRef = localStorage.getItem('ref');

  const {data:discount} = useShowDiscountToUserQuery({code:storedRef,userId:SingleUser?.user?.id})
  
  const { t } = useTranslation();
  useEffect(() => {
    if (!token) {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalCart(cartData);
    }
  }, [token]);

  useEffect(() => {
    if (data?.data?.cartItems) {
      refetch();
    }
  }, [data]);

  const handleUpdateCart = async (id, updates) => {
    const item = cartItems.find((item) => item.id === id);
    const cartData = {
      ...updates,
      size: updates.size || item.size,
      color: updates.color || item.color,
      product_id: updates.product_id || item.product_id,
    };

    if (token) {
      try {
        await updateCart(cartData).unwrap();
        refetch();
        notification.success({
          message: t("Cart Updated"),
          description: t("Item updated successfully in your cart."),
        });
      } catch (error) {
        notification.error({
          message: t("Error"),
          description: t("Failed to update the cart. Please try again.",error),
        });
      }
    } else {
      const updatedCart = localCart.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      notification.success({
        message: t("Cart Updated"),
        description: t("Item updated successfully in your cart."),
      });
    }
  };

  const handleRemoveItem = async (id) => {
    if (token) {
      try {
        await delCart(id).unwrap();
        refetch();
        notification.success({
          message: t("Item Removed"),
          description: t("The item has been successfully removed from your cart."),
        });
      } catch (error) {
        notification.error({
          message: t("Error"),
          description: t("Failed to remove the item. Please try again.",error),
        });
      }
    } else {
      const updatedCart = localCart.filter((item) => item.id !== id);
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      notification.success({
        message: t("Item Removed"),
        description: t("The item has been successfully removed from your cart."),
      });
    }
  };

  const cartItems = token ? data?.data?.cartItems || [] : localCart;

  const { total, totalAfterCashback } = useMemo(() => {
    const cartData = token ? data?.data?.cartItems : localCart; 
    const total = cartData?.reduce((sum, item) => {
      return sum + item.quantity * (item.product?.price_discount || item.product_price);
    }, 0);
    const cashback = discount?.orders?.data?.length === 0 ? 0 : Number(discount?.orders?.data?.cashback);
    const cashbackAmount = discount?.orders?.data?.type === 'percent'
      ? (total * cashback) / 100 
      : cashback; 
    return { total, totalAfterCashback: total - cashbackAmount };
    
  }, [token, data?.data?.cartItems, localCart]);
  

  const columns = [
    {
      title: t("Item"),
      dataIndex: token?"product":"product_name",
      key: "name",
      render: (product) => product?.name || product,
    },
    {
      title: t("Price"),
      dataIndex: token?"product":"product_price",
      key: "price",
      render: (product) => token?`$${parseFloat(product?.price_discount || 0).toFixed(2)}`:product,
    },
    {
      title: t("Quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleUpdateCart(record.id, { quantity: value })}
        />
      ),
    },
    {
      title: t("Color"),
      dataIndex: "color",
      key: "color",
      render: (color) => (
        <p style={{ backgroundColor: color, width: "25px", height: "25px", borderRadius: "50%" }}></p>
      ),
    },
    {
      title: t("Size"),
      dataIndex: "size",
      key: "size",
      render: (size) => <p>{size}</p>,
    },
    {
      title: t("Total"),
      key: "total",
      render: (_, record) => {
        const totalPrice = token 
          ? record.quantity * (record.product?.price_discount || 0) 
          : record.quantity * (record.product_price * (record.product_price?.price_discount || 1));
        return `$${totalPrice.toFixed(2)}`;
      },
    },  
       {
      title: t("Action"),
      key: "action",
      render: (_, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];

  const handleCheckout = () => {
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };


  return (
    <div className="cart-cont">
      <div className="shopping-cart">
        <TitleSection title={t("My Cart")} />
        <Table
          dataSource={cartItems}
          columns={columns}
          isLoading={isLoading}
          pagination={false}
          rowClassName={rowClassName}
          rowKey="id"
        />
        <div className="cart-summary" style={{ marginTop: "20px" }}>
          <h3>{t("Total")}: ${total?.toFixed(2)}</h3>
          {discount?.orders?.data?.length > 0 && (
            <h3>{t("Discount")}: ${discount?.orders?.data?.cashback}</h3>
          )}
          {discount?.orders?.data?.length > 0 &&(
            <h3>{t("Total After discount")}: ${totalAfterCashback.toFixed(2)}</h3>
          )}
          <Button
            type="primary"
            size="large"
            className="banner-button"
            onClick={handleCheckout}
          >
            {t("Checkout")}
          </Button>
        </div>
      </div>

      <CheckoutDrawer
        visible={isDrawerVisible}
        onClose={handleCloseDrawer}
        amount_cents={totalAfterCashback?.toFixed(2)}
        discount={30}
        before_discount={total?.toFixed(2)}
        type_user={token?"customer":"Guest"}
        cartItems={cartItems}
      />
    </div>
  );
};

export default ShoppingCart;
