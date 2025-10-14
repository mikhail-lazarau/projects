import styles from './Loader.module.css';

export const Loader = () => (




  

  <div className={styles.loaderContainer} data-testid="loader">
    <svg
      className={styles.loader}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading"
      role="status"
    >
      <g clipPath="url(#clip0_1_3471)">
        <path
          d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
          stroke="#989898"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3471">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);
