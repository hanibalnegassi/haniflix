
import styles from "./privacy.module.scss";
import { addClassNames } from "../../store/utils/functions";
import { Box } from "@mui/material";

const PrivacyPage = () => {

    return (
        <>
            <div className={addClassNames(styles["loginNew"])}>
            <div className="absolute pointer-events-none top-0 right-0 left-0 h-[60px] bg-gradient-to-b from-black to-transparent"></div>

                <Box
                    className={addClassNames(styles["top"], "ml-[40px] mr-[40px]")}

                // style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}
                >
                    <div
                        className={addClassNames(
                            styles["wrapper"],
                            " flex items-center justify-between "
                        )}
                    >
                        <a href={"/"} style={{ textDecoration: "none" }} className={styles["link"]}>
                            <h1> <span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>

                        </a>

                    </div>
                </Box>
                <div className="container overflow-auto	p-2 mt-2">
                    <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
                        Privacy Policy
                    </h2>
                    <p className="text-lg">
                        This privacy policy ("policy") will help you understand how Haniflix ("us", "we", "our") uses and protects the data you provide to us when you visit and use www.haniflix.com ("website ", "service"). We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page. What User Data We Collect When you visit the website, we may collect the following data: • Your IP address. • Your contact information and email address. • Other information such as interests and preferences. • Data profile regarding your online behavior on our website. Why We Collect Your Data We are collecting your data for several reasons: • To better understand your needs. • To improve our services and products. • To send you promotional emails containing the information we think you will find interesting. • To contact you to fill out surveys and participate in other types of market research. • To customize our website according to your online behavior and personal preferences. Safeguarding and Securing the Data Haniflix is committed to securing your data and keeping it confidential. Haniflix has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online. Our Cookie Policy Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you visit and spend the most time on). The data we collect by using cookies is used to customize our website to your needs. Website privacy policy template by WebsitePolicies.com After we use the data for statistical analysis, the data is completely removed from our systems. Please note that cookies don't allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you. If you want to disable cookies, you can do it by accessing the settings of your internet browser. You can visit https://www.internetcookies.com, which contains comprehensive information on how to do this on a wide variety of browsers and devices. Links to Other Websites Our website contains links that lead to other websites. If you click on these links Haniflix is not held responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website. Restricting the Collection of your Personal Data At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following: When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, if you don't want to disclose your personal information. If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to change this for you. Haniflix will not lease, sell or distribute your personal information to any third parties, unless we have your permission. We might do so if the law forces us. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.

                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPage;
