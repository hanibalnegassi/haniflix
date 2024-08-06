import StarRateIcon from '@mui/icons-material/StarRate';

const GradientStarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="53.93%" stopColor="#14FA9B" />
                <stop offset="77.59%" stopColor="#128EE9" />
            </linearGradient>
        </defs>
        <StarRateIcon style={{ fill: 'url(#starGradient)' }} />
    </svg>
);

export default GradientStarIcon;