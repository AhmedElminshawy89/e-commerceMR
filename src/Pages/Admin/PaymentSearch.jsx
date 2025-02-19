import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Table, Modal, Tag } from "antd";
import { useLazyShowAllAdminPaymentSearchQuery } from "../../app/Api/Payments"; 
import { FaRegEye } from "react-icons/fa";

const PaymentSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerName, setCustomerName] = useState("");

  const [triggerSearch, { data: ReviewData, isLoading }] = useLazyShowAllAdminPaymentSearchQuery();

  const pageSize = 10;

  const showModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPayment(null);
  };

  const getStatusTag = (status) => {
    let color = "blue";
    if (status === "pending") color = "blue";
    else if (status === "paid") color = "green";
    else if (status === "failed") color = "red";
    return <Tag color={color}>{status}</Tag>;
  };



  const columns = [
    { title: "Order ID", dataIndex: "order_id", key: "order_id", width: 50 },
    {
      title: "Name",
      dataIndex: "shipping_data",
      key: "shipping_data",
      render(value) {
        return (
          <div>
            {value?.first_name} {value?.last_name}
          </div>
        );
      },
      width: 150,
    },
    { title: "Payment Method", dataIndex: "payment_method", key: "payment_method", width: 50 },
    { title: "Status", dataIndex: "status", key: "status", width: 50, render: getStatusTag },
    // { title: "Amount Before Discount", dataIndex: "before_discount", key: "before_discount", width: 200 },
    // { title: "Discount", dataIndex: "discount", key: "discount", width: 50 },
    { title: "Amount After Discount", dataIndex: "amount_cents", key: "amount_cents", width: 150 },
    {
      title: "Actions",
      key: "actions",
      render: (record) =>(
        <Button
          onClick={() => showModal(record)}
          style={{ color: "#333" }}
        ><FaRegEye/></Button>
      ),
      width: 150,
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  const handleSearch = () => {
    // الآن يتم استدعاء الـ query عند الضغط على زر البحث
    triggerSearch({
      start_date: startDate,
      end_date: endDate,
      customer_name: customerName,
    });
    setCurrentPage(1); // إعادة تعيين الصفحة إلى 1 عند البحث
  };

  return (
    <Box sx={{ height: 500, width: "100%" }} className="cta">
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>

      <Table
        dataSource={ReviewData?.orders || []}
        columns={columns}
        rowClassName={rowClassName}
        rowKey="id"
        loading={isLoading}
        pagination={{
          total: ReviewData?.orders?.total || 0,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
      />

      <Modal title="Payment Details" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedPayment && (
          <div>
            <p><strong>Transaction ID:</strong> {selectedPayment.transaction_id || "Not Available"}</p>
            <p><strong>Payment Method:</strong> {selectedPayment.payment_method || "Not Available"}</p>
            <p><strong>Status:</strong> {getStatusTag(selectedPayment.status)}</p>
            <p><strong>Amount Before Discount:</strong> {selectedPayment.before_discount} {selectedPayment.currency}</p>
            <p><strong>Discount:</strong> {selectedPayment.discount} {selectedPayment.currency}</p>
            <p><strong>Amount After Discount:</strong> {selectedPayment.amount_cents} {selectedPayment.currency}</p>
            <p><strong>Customer Name:</strong> {selectedPayment.shipping_data?.first_name} {selectedPayment.shipping_data?.last_name}</p>
            <p><strong>Email:</strong> {selectedPayment.shipping_data?.email}</p>
            <p><strong>Phone Number:</strong> {selectedPayment.shipping_data?.phone_number}</p>
            <p><strong>Shipping Address:</strong>
              <ul>
                <li><strong>Street:</strong> {selectedPayment.shipping_data?.street}</li>
                <li><strong>Building:</strong> {selectedPayment.shipping_data?.building}</li>
                <li><strong>City:</strong> {selectedPayment.shipping_data?.city}</li>
                <li><strong>State:</strong> {selectedPayment.shipping_data?.state}</li>
                <li><strong>Country:</strong> {selectedPayment.shipping_data?.country}</li>
                <li><strong>Floor:</strong> {selectedPayment.shipping_data?.floor}</li>
                <li><strong>Postal Code:</strong> {selectedPayment.shipping_data?.postal_code}</li>
              </ul>
            </p>
            <h4>Items:</h4>
            <ul>
              {selectedPayment.items?.map((item, index) => (
                <li key={index}>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Color:</strong> {item.color}</p>
                  <p><strong>Size:</strong> {item.size}</p>
                  <p><strong>Amount:</strong> {item.amount_cents} {selectedPayment.currency}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </Box>
  );
};

export default PaymentSearch;
