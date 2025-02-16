import { useTranslation } from "react-i18next";
import logo from "../assets/Img/logo.jpg";

const LoadingSite = () => {
  const { i18n } = useTranslation();

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.text}>
          {i18n.language === "EN" ? "Loading..." : "تحميل..."}
        </h2>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f8f7",
    textAlign: "center",
  },
  logo: {
    width: "128px",
    height: "128px",
    margin: "auto",
    animation: "pulse 1.5s infinite ease-in-out",
    borderRadius: "128px",
  },
  text: {
    marginTop: "16px",
    fontSize: "18px",
    fontWeight: "600",
    opacity: "0",
    animation: "fadeIn 1.5s forwards ease-in-out",
    color: "#333",
  },
};

export default LoadingSite;
