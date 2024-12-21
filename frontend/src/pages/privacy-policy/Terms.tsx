
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addClassNames } from "../../store/utils/functions";

import "../../Assets/css/styles.scss";
import styles from "./privacy.module.scss";

const TermsPage = () => {
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
        <div className="container p-2 mt-2" id="termsServicePage" style={{
                height:'100%'
              }}>
          <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
            Terms Of Service
          </h2>
          <div className="text-lg">
            Introduction
            <br /><br />
            At Haniflix, by using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
            <br /><br />
            Account Registration
            <br /><br />
            Eligibility: You must be at least 18 years old to use Haniflix. By registering, you represent that you meet this age requirement.
            <br /><br />
            Account Information: You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any
            unauthorized use of your account.
            <br /><br />
            Subscription and Billing
            <br /><br />
            Subscription Plans: Haniflix offers various subscription plans. The details and pricing of each plan are available on our website.
            <br /><br />
            Billing Cycle: Your subscription will automatically renew at the end of each billing cycle unless you cancel it. You authorize us to charge your payment method for the subscription fee.
            <br /><br />
            Use of Service
            <br /><br />
            Personal Use: Haniflix is for your personal and non-commercial use only. You agree not to use our service for any unlawful or unauthorized purposes.
            <br /><br />
            Content Availability: The availability of content on Haniflix may change from time to time, and we do not guarantee the availability of any particular movie or show.
            <br /><br />
            Intellectual Property
            <br /><br />
            Ownership: All content provided by Haniflix, including but not limited to movies, TV shows, and software, is owned by or licensed to us. You agree not to reproduce, distribute, modify, or create derivative works from any content.
            <br /><br />
            Termination
            <br /><br />
            Termination by Haniflix: We reserve the right to terminate or suspend your account at our discretion if we believe you have violated these Terms of Service.
            <br /><br />
            Termination by You: You can cancel your subscription at any time through your account settings. Upon cancellation, your access to Haniflix will continue until the end of your current billing period.
            <br /><br />
            Disclaimers
            <br /><br />
            No Warranties: Haniflix is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our service will be uninterrupted or error-free.
            <br /><br />
            Limitation of Liability: Haniflix will not be liable for any indirect, incidental, or consequential damages arising from your use of our service.
            Governing Law
            <br /><br />
            These Terms of Service will be governed by and construed in accordance with the laws of Ontario, Canada.
            <br /><br />
            Changes to Terms
            <br /><br />
            We may update these Terms of Service from time to time. Any changes will be posted on our website, and your continued use of Haniflix after the changes take effect will constitute your acceptance of the new terms.
            <br /><br />
            Contact Us
            <br /><br />
            If you have any questions about these Terms of Service, please contact us at haniflix@icloud.com.
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
