import styles from './ticker.module.scss'; // Import your CSS module


const ImageTicker = ({ images }) => (
    <div className={styles["slider-logos"]}>
        <div className={styles["slider-logos-slide"]}>
            {images.map((x: string) => <img src={x} />)}
        </div>
    </div>
);

export default ImageTicker;