import PropTypes from "prop-types";

const Gear = ({ width = 24, height = 24, color = "#000000" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48193L13.5578 4.36972L12.9353 2H10.981L10.3491 4.40167L7.74526 5.51406L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40167 13.6509L5.51406 16.2547L4 18L6 20L7.79118 18.5407L10.3971 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155L18 20L20 18L18.518 16.2647L19.6302 13.5578L22 12.9353V10.981L19.6224 10.3954Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Gear.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default Gear;
