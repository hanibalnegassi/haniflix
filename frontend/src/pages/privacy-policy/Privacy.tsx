
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { addClassNames } from "../../store/utils/functions";

import styles from "./privacy.module.scss";

const PrivacyPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={addClassNames(styles["loginNew"])}>
        <Box className={addClassNames(styles["top"], "px-[20px] w-full")}>
          <div className={addClassNames(styles["wrapper"], "flex items-center justify-between w-full")}>
            <Link to={"/"} className={styles["link"] + " no-underline"}>
              <h1><span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>
            </Link>
            <button className="theme_button_danger w-[120px] rounded-[10px]"
              style={{
                borderColor: '#14f59e',
                background: '#14f59e1f',
                color: '#14f59e',
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </Box>
        <div className="container overflow-auto	p-2 mt-2">
          <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
            Privacy Policy
          </h2>
          <p className="text-lg">
            Introduction
            <br /><br />
            At Haniflix, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
            <br /><br />
            Information We Collect
            <br /><br />
            Personal Information: When you sign up for Haniflix, we collect your name, email address, payment information, and other necessary details to provide our services.
            <br /><br />
            Usage Data: We collect information about how you interact with our platform, such as the movies you watch, your browsing habits, and your device information.
            <br /><br />
            How We Use Your Information
            <br /><br />
            Service Delivery: To provide and maintain our streaming services, including user account management, customer support, and processing payments.
            <br /><br />
            Personalization: To tailor our content recommendations based on your preferences and usage patterns.
            <br /><br />
            Improvement: To analyze user behavior and improve our services, features, and content offerings.
            <br /><br />
            Sharing Your Information
            <br /><br />
            Third-Party Services: We may share your information with third-party service providers to assist with payment processing, content delivery, and analytics.
            <br /><br />
            Legal Requirements: We may disclose your information if required by law or to protect our rights and users' safety.
            <br /><br />
            Data Security
            <br /><br />
            We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
            <br /><br />
            Your Rights
            <br /><br />
            Access: You have the right to access the personal data we hold about you.
            <br /><br />
            Correction: You can request corrections to any inaccurate or incomplete data.
            <br /><br />
            Deletion: You may request the deletion of your personal data, subject to certain conditions.
            <br /><br />
            Changes to This Policy
            <br /><br />
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website.
            <br /><br />
            Contact Us
            <br /><br />
            If you have any questions or concerns about our Privacy Policy, please contact us at haniflix@icloud.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
