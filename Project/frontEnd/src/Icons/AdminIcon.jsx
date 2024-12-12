import PropTypes from "prop-types";

const AdminIcon = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle style="fill:#FFDA44;" cx="30" cy="30" r="30" />
        <path
          style="fill:#FF9811;"
          d="M30,60c12.168,0,22.45-7.326,26.897-17.792L37.328,33.661L19.96,41.967l0.046,0.046
            C23.187,56.43,26.351,60,30,60z"
        />
        <path
          style="fill:#FF9811;"
          d="M56.897,42.208C58.771,38.267,60,33.27,60,28.022H30v-8.333h15.649L56.897,42.208z"
        />
        <polygon
          style="fill:#D80027;"
          points="30,34.889 19.96,41.967 19.96,22.778 30,15.7 40.04,22.778 40.04,41.967     "
        />
        <path
          style="fill:#0052B4;"
          d="M40.04,41.967V22.778L30,15.7l0,0v19.189v19.189l10.04-7.078H40.04z"
        />
        <path
          style="fill:#6DA544;"
          d="M30,22.778v19.189V30.611l-9.385,5.759v1.782v1.782L30,41.967V34.889z"
        />
        <path
          style="fill:#A2001D;"
          d="M30,34.889v7.078l-5.041-3.091v-7.078L30,34.889z"
        />
      </g>
    </svg>
  );
};

AdminIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default AdminIcon;
