import React, { SVGProps } from 'react'

export default function SvgBrand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      height="48"
      width="48"
      focusable="false"
      role="img"
      fill="currentColor"
      {...props}
    >
      <title>Brand icon</title>
      <path fill="none" d="M0 0h24v24H0z"></path><path d="m3 7 8.445-5.63a1 1 0 0 1 1.11 0L21 7v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7zm2 1.07V20h14V8.07l-7-4.666L5 8.07zM8 16h8v2H8v-2zm0-3h8v2H8v-2zm4-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
    </svg>
  );
}