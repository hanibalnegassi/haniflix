import styles from './gradButton.module.scss'; // Import your CSS module

const CustomButton = ({ text, onClick, style = {}, buttonStyle = {} }) => {
    return (
        <div style={style} className={styles["button-body"]}>
            <button style={buttonStyle} className={styles["app_button"]} onClick={onClick}>
                {text}
            </button>
            <p className={styles["button-text"]} onClick={onClick}>{text}</p>
        </div>
    );
};

export default CustomButton;