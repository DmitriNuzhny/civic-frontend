export const TrustIcon = ({className}: {className?: string}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1_2263)">
        <path
          d="M0.0566406 5.78125L17.5133 0.00878906V39.9705C5.04414 34.6419 0.0566406 24.4295 0.0566406 18.6579V5.78125Z"
          fill="#0500FF"
        />
        <path
          d="M34.9703 5.78125L17.5137 0.00878906V39.9705C29.9828 34.6419 34.9703 24.4295 34.9703 18.6579V5.78125Z"
          fill="url(#paint0_linear_1_2263)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_2263"
          x1="30.3699"
          y1="-2.77684"
          x2="16.7645"
          y2="39.3007"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.02" stopColor="#0000FF" />
          <stop offset="0.08" stopColor="#0094FF" />
          <stop offset="0.16" stopColor="#48FF91" />
          <stop offset="0.42" stopColor="#0094FF" />
          <stop offset="0.68" stopColor="#0038FF" />
          <stop offset="0.9" stopColor="#0500FF" />
        </linearGradient>
        <clipPath id="clip0_1_2263">
          <rect width="35" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
