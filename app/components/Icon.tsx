import * as React from "react";


interface IconProps {
  className?: string;
  
}

export const FacebookIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 32 32"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <circle cx={16} cy={16} r={14} fill="url(#a)" />
    <path
      fill="#fff"
      d="m21.214 20.282.622-3.952h-3.89v-2.563c0-1.081.542-2.136 2.284-2.136H22V8.267S20.395 8 18.86 8c-3.205 0-5.298 1.893-5.298 5.318v3.012H10v3.952h3.562v9.552a14.468 14.468 0 0 0 4.383 0v-9.552h3.269Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={16}
        x2={16}
        y1={2}
        y2={29.917}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#18ACFE" />
        <stop offset={1} stopColor="#0163E0" />
      </linearGradient>
    </defs>
  </svg>
)
export const LinkedInIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <g fill="none">
      <rect width={256} height={256} fill="#fff" rx={60} />
      <rect width={256} height={256} fill="#0A66C2" rx={60} />
      <path
        fill="#fff"
        d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82 19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4ZM38 59.627c0 11.865 9.767 21.627 21.632 21.627 11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38 47.762 38 38 47.763 38 59.627Zm6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4Z"
      />
    </g>
  </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 -7 48 48"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <title>{"Youtube-color"}</title>
    <path
      fill="#CE1312"
      fillRule="evenodd"
      d="m19.044 23.27-.002-13.582 12.97 6.814-12.968 6.768ZM47.52 7.334s-.47-3.33-1.908-4.798C43.786.61 41.74.601 40.803.49 34.086 0 24.011 0 24.011 0h-.022S13.914 0 7.197.49C6.258.6 4.214.61 2.387 2.535.948 4.003.48 7.334.48 7.334S0 11.247 0 15.158v3.668c0 3.912.48 7.823.48 7.823s.468 3.331 1.907 4.798c1.827 1.926 4.225 1.866 5.293 2.067C11.52 33.885 24 34 24 34s10.086-.015 16.803-.505c.938-.113 2.983-.122 4.809-2.048 1.438-1.467 1.908-4.798 1.908-4.798s.48-3.91.48-7.823v-3.668c0-3.911-.48-7.824-.48-7.824Z"
    />
  </svg>
)
export const InstaIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    viewBox="0 0 100 100"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <style>{".st140{fill:#dd2a7b}"}</style>
    <g id="Layer_2">
      <path
        d="M75.352 18.949c-7.6.233-7.598 11.167 0 11.398 7.6-.233 7.598-11.167 0-11.398zM50 25.547c-13.47 0-24.389 10.948-24.389 24.453 1.285 32.437 47.497 32.428 48.777 0C74.389 36.495 63.469 25.547 50 25.547zm0 40.326c-8.743 0-15.831-7.107-15.831-15.873.834-21.055 30.832-21.05 31.663 0-.001 8.767-7.089 15.873-15.832 15.873z"
        className="st140"
      />
      <path
        d="M97.208 30.418C96.856 13.751 86.252 3.141 69.581 2.792c-4.003-.386-35.157-.393-39.163 0-16.667.352-27.277 10.956-27.626 27.627-.386 3.997-.394 35.161 0 39.163.311 16.613 11.011 27.316 27.626 27.626 4.003.39 35.157.39 39.163 0 5.055-.231 8.508-1.034 11.529-2.208 10.587-4.229 15.76-13.636 16.098-25.419.386-4.003.393-35.157 0-39.163zM69.191 88.659c-3.939.376-34.441.382-38.383 0-4.63-.211-7.145-.985-8.819-1.635-14.449-6.702-9.969-20.255-10.65-38.858.015-4.321-.009-13.036.001-17.357.577-12.882 6.644-18.846 19.468-19.468 3.944-.376 34.438-.382 38.383 0 12.886.577 18.844 6.644 19.468 19.467.255 3.079.44 19.887 0 28.393.475 15.976-.253 28.521-19.468 29.458z"
        className="st140"
      />
    </g>
  </svg>
)
export const MapIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    stroke="#fff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203.21-4.243 4.242a3 3 0 0 1-4.097.135l-.144-.135-4.244-4.243A9 9 0 0 1 18.364 4.636zM12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
    />
  </svg>
)
export const PhoneIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    stroke="#fff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M9 3a1 1 0 0 1 .877.519l.051.11 2 5a1 1 0 0 1-.313 1.16l-.1.068-1.674 1.004.063.103a10 10 0 0 0 3.132 3.132l.102.062 1.005-1.672a1 1 0 0 1 1.113-.453l.115.039 5 2a1 1 0 0 1 .622.807L21 15v4c0 1.657-1.343 3-3.06 2.998C9.361 21.477 2.522 14.638 2 6a3 3 0 0 1 2.824-2.995L5 3h4z"
    />
  </svg>
)
export const MailIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    stroke="#fff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297.116.066a1 1 0 0 0 .878 0l.116-.066L22 7.535z"
    />
    <path
      fill="currentColor"
      stroke="none"
      d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a2.999 2.999 0 0 1 2.354-1.42L5 4h14z"
    />
  </svg>
)

export const LeftIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    stroke="#00abfb"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3}
    viewBox="0 0 24 24"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m14 6-6 6 6 6V6" />
  </svg>
)

export const RightIcon: React.FC<IconProps> = ({className, ...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    stroke="#00abfb"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3}
    viewBox="0 0 24 24"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m10 18 6-6-6-6v12" />
  </svg>
)






