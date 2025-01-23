// import  { useState } from "react";
// import { Button, InputNumber, Select } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import '../Style/ShoppingCart.css'
// import TitleSection from "../Shared/TitleSection";

// const ShoppingCart = () => {
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: "Item 1", price: 50, quantity: 1, color: "#FF0000", size: "M" },
//     { id: 2, name: "Item 2", price: 30, quantity: 2, color: "#0000FF", size: "L" },
//     { id: 3, name: "Item 3", price: 20, quantity: 1, color: "#008000", size: "S" },
//   ]);

//   const handleQuantityChange = (id, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const handleColorChange = (id, color) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, color } : item
//       )
//     );
//   };

//   const handleSizeChange = (id, size) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, size } : item
//       )
//     );
//   };

//   const handleRemoveItem = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="shopping-cart">
//       <TitleSection title='My Cart'/>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="cart-table">
//             <div className="table-shopping">
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>Item</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Color</th>
//                         <th>Size</th>
//                         <th>Total</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {cartItems.map((item) => (
//                         <tr key={item.id}>
//                         <td>{item.name}</td>
//                         <td>${item.price.toFixed(2)}</td>
//                         <td>
//                             <InputNumber
//                             min={1}
//                             value={item.quantity}
//                             onChange={(value) => handleQuantityChange(item.id, value)}
//                             />
//                         </td>
//                         <td>
//                             <Select
//                             value={item.color}
//                             onChange={(value) => handleColorChange(item.id, value)}
//                             options={[
//                                 { value: "#FF0000", label: <div className="color-box" style={{ backgroundColor: "#FF0000" }}></div> },
//                                 { value: "#0000FF", label: <div className="color-box" style={{ backgroundColor: "#0000FF" }}></div> },
//                                 { value: "#008000", label: <div className="color-box" style={{ backgroundColor: "#008000" }}></div> },
//                                 { value: "#000000", label: <div className="color-box" style={{ backgroundColor: "#000000" }}></div> },
//                             ]}
//                             />
//                         </td>
//                         <td>
//                             <Select
//                             value={item.size}
//                             onChange={(value) => handleSizeChange(item.id, value)}
//                             options={[
//                                 { value: "S", label: "S" },
//                                 { value: "M", label: "M" },
//                                 { value: "L", label: "L" },
//                                 { value: "XL", label: "XL" },
//                             ]}
//                             />
//                         </td>
//                         <td>${(item.price * item.quantity).toFixed(2)}</td>
//                         <td>
//                             <Button
//                             type="danger"
//                             icon={<DeleteOutlined />}
//                             onClick={() => handleRemoveItem(item.id)}
//                             />
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//           <div className="cart-summary">
//             <h3>Total: ${totalPrice.toFixed(2)}</h3>
//             <h3>Cashback: $30</h3>
//             <h3>Total: ${totalPrice.toFixed(2) - 30}</h3>
//             <Button type="primary" size="large" className="banner-button">
//               Checkout
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCart;




import { Table, InputNumber, Select, Button, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import "../Style/ShoppingCart.css";
import TitleSection from "../Shared/TitleSection";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 50, quantity: 1, color: "#FF0000", size: "M" },
    { id: 2, name: "Item 2", price: 30, quantity: 2, color: "#0000FF", size: "L" },
    { id: 3, name: "Item 3", price: 20, quantity: 1, color: "#008000", size: "S" },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleColorChange = (id, color) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, color } : item
      )
    );
  };

  const handleSizeChange = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, size } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    notification.success({
      message: "Item Removed",
      description: "The item has been successfully removed from your cart.",
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color, record) => (
        <Select
          value={color}
          onChange={(value) => handleColorChange(record.id, value)}
          options={[
            { value: "#FF0000", label: <div className="color-box" style={{ backgroundColor: "#FF0000" }}></div> },
            { value: "#0000FF", label: <div className="color-box" style={{ backgroundColor: "#0000FF" }}></div> },
            { value: "#008000", label: <div className="color-box" style={{ backgroundColor: "#008000" }}></div> },
            { value: "#000000", label: <div className="color-box" style={{ backgroundColor: "#000000" }}></div> },
          ]}
        />
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size, record) => (
        <Select
          value={size}
          onChange={(value) => handleSizeChange(record.id, value)}
          options={[
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
            { value: "XL", label: "XL" },
          ]}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
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

  return (
    <div className="shopping-cart">
      <TitleSection title="My Cart" />
      <Table
        dataSource={cartItems}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <div className="cart-summary" style={{ marginTop: "20px" }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <h3>Cashback: $30</h3>
        <h3>Total After Cashback: ${totalPrice.toFixed(2) - 30}</h3>
        <Button type="primary" size="large" className="banner-button">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
