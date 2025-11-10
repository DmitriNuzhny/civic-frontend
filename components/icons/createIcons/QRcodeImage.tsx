"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRcodeImageProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  bgColor?: string;
  fgColor?: string;
}

export const QRcodeImage = ({
  value,
  size = 240,
  level = "M",
  bgColor = "#ffffff",
  fgColor = "#000000",
}: QRcodeImageProps) => {
  // Ensure value is provided
  if (!value) {
    return (
      <div className="flex items-center justify-center w-[240px] h-[240px] bg-white dark:bg-[#0D111D] rounded-lg">
        <span className="text-gray-400 dark:text-gray-600 text-sm">
          No address provided
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center rounded-lg p-2">
      <QRCodeSVG
        value={value}
        size={size}
        level={level}
        bgColor={bgColor}
        fgColor={fgColor}
        includeMargin={true}
      />
    </div>
  );
};

// Legacy static QR code component (kept for backward compatibility if needed)
export const StaticQRcodeImage = () => {
  return (
    <svg
      width="240"
      height="240"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_1832)">
        <g clipPath="url(#clip1_1_1832)">
          <path d="M240 0H0V240H240V0Z" fill="white" />
          <path d="M108.481 24H100.801V31.68H108.481V24Z" fill="black" />
          <path d="M146.879 24H139.199V31.68H146.879V24Z" fill="black" />
          <path
            d="M93.1195 31.6802H85.4395V39.3602H93.1195V31.6802Z"
            fill="black"
          />
          <path
            d="M100.799 31.6802H93.1191V39.3602H100.799V31.6802Z"
            fill="black"
          />
          <path
            d="M108.481 31.6802H100.801V39.3602H108.481V31.6802Z"
            fill="black"
          />
          <path
            d="M131.52 31.6802H123.84V39.3602H131.52V31.6802Z"
            fill="black"
          />
          <path d="M139.2 31.6802H131.52V39.3602H139.2V31.6802Z" fill="black" />
          <path
            d="M154.561 31.6802H146.881V39.3602H154.561V31.6802Z"
            fill="black"
          />
          <path
            d="M93.1195 39.3599H85.4395V47.0399H93.1195V39.3599Z"
            fill="black"
          />
          <path
            d="M146.879 39.3599H139.199V47.0399H146.879V39.3599Z"
            fill="black"
          />
          <path
            d="M154.561 39.3599H146.881V47.0399H154.561V39.3599Z"
            fill="black"
          />
          <path d="M100.799 47.04H93.1191V54.72H100.799V47.04Z" fill="black" />
          <path d="M123.84 47.04H116.16V54.72H123.84V47.04Z" fill="black" />
          <path d="M146.879 47.04H139.199V54.72H146.879V47.04Z" fill="black" />
          <path d="M154.561 47.04H146.881V54.72H154.561V47.04Z" fill="black" />
          <path
            d="M93.1195 54.7202H85.4395V62.4002H93.1195V54.7202Z"
            fill="black"
          />
          <path
            d="M100.799 54.7202H93.1191V62.4002H100.799V54.7202Z"
            fill="black"
          />
          <path
            d="M108.481 54.7202H100.801V62.4002H108.481V54.7202Z"
            fill="black"
          />
          <path
            d="M123.84 54.7202H116.16V62.4002H123.84V54.7202Z"
            fill="black"
          />
          <path
            d="M131.52 54.7202H123.84V62.4002H131.52V54.7202Z"
            fill="black"
          />
          <path d="M139.2 54.7202H131.52V62.4002H139.2V54.7202Z" fill="black" />
          <path
            d="M154.561 54.7202H146.881V62.4002H154.561V54.7202Z"
            fill="black"
          />
          <path
            d="M93.1195 62.3999H85.4395V70.0799H93.1195V62.3999Z"
            fill="black"
          />
          <path
            d="M108.481 62.3999H100.801V70.0799H108.481V62.3999Z"
            fill="black"
          />
          <path
            d="M123.84 62.3999H116.16V70.0799H123.84V62.3999Z"
            fill="black"
          />
          <path
            d="M146.879 62.3999H139.199V70.0799H146.879V62.3999Z"
            fill="black"
          />
          <path
            d="M93.1195 70.0801H85.4395V77.7601H93.1195V70.0801Z"
            fill="black"
          />
          <path
            d="M108.481 70.0801H100.801V77.7601H108.481V70.0801Z"
            fill="black"
          />
          <path
            d="M123.84 70.0801H116.16V77.7601H123.84V70.0801Z"
            fill="black"
          />
          <path d="M139.2 70.0801H131.52V77.7601H139.2V70.0801Z" fill="black" />
          <path
            d="M154.561 70.0801H146.881V77.7601H154.561V70.0801Z"
            fill="black"
          />
          <path
            d="M93.1195 77.7598H85.4395V85.4398H93.1195V77.7598Z"
            fill="black"
          />
          <path
            d="M108.481 77.7598H100.801V85.4398H108.481V77.7598Z"
            fill="black"
          />
          <path
            d="M116.16 77.7598H108.48V85.4398H116.16V77.7598Z"
            fill="black"
          />
          <path d="M31.68 85.4399H24V93.1199H31.68V85.4399Z" fill="black" />
          <path
            d="M39.3597 85.4399H31.6797V93.1199H39.3597V85.4399Z"
            fill="black"
          />
          <path
            d="M54.7191 85.4399H47.0391V93.1199H54.7191V85.4399Z"
            fill="black"
          />
          <path
            d="M77.7601 85.4399H70.0801V93.1199H77.7601V85.4399Z"
            fill="black"
          />
          <path
            d="M85.4398 85.4399H77.7598V93.1199H85.4398V85.4399Z"
            fill="black"
          />
          <path
            d="M116.16 85.4399H108.48V93.1199H116.16V85.4399Z"
            fill="black"
          />
          <path
            d="M123.84 85.4399H116.16V93.1199H123.84V85.4399Z"
            fill="black"
          />
          <path
            d="M131.52 85.4399H123.84V93.1199H131.52V85.4399Z"
            fill="black"
          />
          <path d="M139.2 85.4399H131.52V93.1199H139.2V85.4399Z" fill="black" />
          <path
            d="M154.561 85.4399H146.881V93.1199H154.561V85.4399Z"
            fill="black"
          />
          <path
            d="M169.92 85.4399H162.24V93.1199H169.92V85.4399Z"
            fill="black"
          />
          <path d="M177.6 85.4399H169.92V93.1199H177.6V85.4399Z" fill="black" />
          <path
            d="M185.28 85.4399H177.6V93.1199H185.28V85.4399Z"
            fill="black"
          />
          <path
            d="M200.641 85.4399H192.961V93.1199H200.641V85.4399Z"
            fill="black"
          />
          <path
            d="M208.321 85.4399H200.641V93.1199H208.321V85.4399Z"
            fill="black"
          />
          <path
            d="M54.7191 93.1201H47.0391V100.8H54.7191V93.1201Z"
            fill="black"
          />
          <path
            d="M62.4007 93.1201H54.7207V100.8H62.4007V93.1201Z"
            fill="black"
          />
          <path
            d="M70.0804 93.1201H62.4004V100.8H70.0804V93.1201Z"
            fill="black"
          />
          <path
            d="M93.1195 93.1201H85.4395V100.8H93.1195V93.1201Z"
            fill="black"
          />
          <path
            d="M100.799 93.1201H93.1191V100.8H100.799V93.1201Z"
            fill="black"
          />
          <path d="M116.16 93.1201H108.48V100.8H116.16V93.1201Z" fill="black" />
          <path d="M123.84 93.1201H116.16V100.8H123.84V93.1201Z" fill="black" />
          <path d="M131.52 93.1201H123.84V100.8H131.52V93.1201Z" fill="black" />
          <path d="M139.2 93.1201H131.52V100.8H139.2V93.1201Z" fill="black" />
          <path
            d="M146.879 93.1201H139.199V100.8H146.879V93.1201Z"
            fill="black"
          />
          <path
            d="M154.561 93.1201H146.881V100.8H154.561V93.1201Z"
            fill="black"
          />
          <path d="M169.92 93.1201H162.24V100.8H169.92V93.1201Z" fill="black" />
          <path d="M185.28 93.1201H177.6V100.8H185.28V93.1201Z" fill="black" />
          <path
            d="M208.321 93.1201H200.641V100.8H208.321V93.1201Z"
            fill="black"
          />
          <path d="M47.0394 100.8H39.3594V108.48H47.0394V100.8Z" fill="black" />
          <path d="M70.0804 100.8H62.4004V108.48H70.0804V100.8Z" fill="black" />
          <path d="M77.7601 100.8H70.0801V108.48H77.7601V100.8Z" fill="black" />
          <path d="M85.4398 100.8H77.7598V108.48H85.4398V100.8Z" fill="black" />
          <path d="M93.1195 100.8H85.4395V108.48H93.1195V100.8Z" fill="black" />
          <path d="M116.16 100.8H108.48V108.48H116.16V100.8Z" fill="black" />
          <path d="M123.84 100.8H116.16V108.48H123.84V100.8Z" fill="black" />
          <path d="M131.52 100.8H123.84V108.48H131.52V100.8Z" fill="black" />
          <path d="M162.241 100.8H154.561V108.48H162.241V100.8Z" fill="black" />
          <path d="M169.92 100.8H162.24V108.48H169.92V100.8Z" fill="black" />
          <path d="M177.6 100.8H169.92V108.48H177.6V100.8Z" fill="black" />
          <path d="M192.959 100.8H185.279V108.48H192.959V100.8Z" fill="black" />
          <path d="M200.641 100.8H192.961V108.48H200.641V100.8Z" fill="black" />
          <path
            d="M39.3597 108.48H31.6797V116.16H39.3597V108.48Z"
            fill="black"
          />
          <path
            d="M62.4007 108.48H54.7207V116.16H62.4007V108.48Z"
            fill="black"
          />
          <path
            d="M85.4398 108.48H77.7598V116.16H85.4398V108.48Z"
            fill="black"
          />
          <path
            d="M100.799 108.48H93.1191V116.16H100.799V108.48Z"
            fill="black"
          />
          <path
            d="M108.481 108.48H100.801V116.16H108.481V108.48Z"
            fill="black"
          />
          <path d="M116.16 108.48H108.48V116.16H116.16V108.48Z" fill="black" />
          <path d="M123.84 108.48H116.16V116.16H123.84V108.48Z" fill="black" />
          <path d="M139.2 108.48H131.52V116.16H139.2V108.48Z" fill="black" />
          <path
            d="M154.561 108.48H146.881V116.16H154.561V108.48Z"
            fill="black"
          />
          <path
            d="M162.241 108.48H154.561V116.16H162.241V108.48Z"
            fill="black"
          />
          <path d="M169.92 108.48H162.24V116.16H169.92V108.48Z" fill="black" />
          <path d="M177.6 108.48H169.92V116.16H177.6V108.48Z" fill="black" />
          <path d="M185.28 108.48H177.6V116.16H185.28V108.48Z" fill="black" />
          <path d="M216 108.48H208.32V116.16H216V108.48Z" fill="black" />
          <path d="M31.68 116.16H24V123.84H31.68V116.16Z" fill="black" />
          <path
            d="M39.3597 116.16H31.6797V123.84H39.3597V116.16Z"
            fill="black"
          />
          <path
            d="M54.7191 116.16H47.0391V123.84H54.7191V116.16Z"
            fill="black"
          />
          <path
            d="M62.4007 116.16H54.7207V123.84H62.4007V116.16Z"
            fill="black"
          />
          <path
            d="M77.7601 116.16H70.0801V123.84H77.7601V116.16Z"
            fill="black"
          />
          <path
            d="M93.1195 116.16H85.4395V123.84H93.1195V116.16Z"
            fill="black"
          />
          <path
            d="M108.481 116.16H100.801V123.84H108.481V116.16Z"
            fill="black"
          />
          <path d="M116.16 116.16H108.48V123.84H116.16V116.16Z" fill="black" />
          <path d="M131.52 116.16H123.84V123.84H131.52V116.16Z" fill="black" />
          <path
            d="M154.561 116.16H146.881V123.84H154.561V116.16Z"
            fill="black"
          />
          <path d="M169.92 116.16H162.24V123.84H169.92V116.16Z" fill="black" />
          <path d="M177.6 116.16H169.92V123.84H177.6V116.16Z" fill="black" />
          <path
            d="M200.641 116.16H192.961V123.84H200.641V116.16Z"
            fill="black"
          />
          <path
            d="M208.321 116.16H200.641V123.84H208.321V116.16Z"
            fill="black"
          />
          <path d="M216 116.16H208.32V123.84H216V116.16Z" fill="black" />
          <path
            d="M39.3597 123.84H31.6797V131.52H39.3597V123.84Z"
            fill="black"
          />
          <path
            d="M47.0394 123.84H39.3594V131.52H47.0394V123.84Z"
            fill="black"
          />
          <path
            d="M85.4398 123.84H77.7598V131.52H85.4398V123.84Z"
            fill="black"
          />
          <path
            d="M100.799 123.84H93.1191V131.52H100.799V123.84Z"
            fill="black"
          />
          <path d="M116.16 123.84H108.48V131.52H116.16V123.84Z" fill="black" />
          <path d="M139.2 123.84H131.52V131.52H139.2V123.84Z" fill="black" />
          <path d="M177.6 123.84H169.92V131.52H177.6V123.84Z" fill="black" />
          <path d="M185.28 123.84H177.6V131.52H185.28V123.84Z" fill="black" />
          <path
            d="M200.641 123.84H192.961V131.52H200.641V123.84Z"
            fill="black"
          />
          <path
            d="M208.321 123.84H200.641V131.52H208.321V123.84Z"
            fill="black"
          />
          <path d="M216 123.84H208.32V131.52H216V123.84Z" fill="black" />
          <path d="M31.68 131.52H24V139.2H31.68V131.52Z" fill="black" />
          <path
            d="M62.4007 131.52H54.7207V139.2H62.4007V131.52Z"
            fill="black"
          />
          <path
            d="M77.7601 131.52H70.0801V139.2H77.7601V131.52Z"
            fill="black"
          />
          <path
            d="M85.4398 131.52H77.7598V139.2H85.4398V131.52Z"
            fill="black"
          />
          <path
            d="M93.1195 131.52H85.4395V139.2H93.1195V131.52Z"
            fill="black"
          />
          <path
            d="M100.799 131.52H93.1191V139.2H100.799V131.52Z"
            fill="black"
          />
          <path d="M116.16 131.52H108.48V139.2H116.16V131.52Z" fill="black" />
          <path d="M139.2 131.52H131.52V139.2H139.2V131.52Z" fill="black" />
          <path
            d="M146.879 131.52H139.199V139.2H146.879V131.52Z"
            fill="black"
          />
          <path
            d="M154.561 131.52H146.881V139.2H154.561V131.52Z"
            fill="black"
          />
          <path d="M169.92 131.52H162.24V139.2H169.92V131.52Z" fill="black" />
          <path d="M185.28 131.52H177.6V139.2H185.28V131.52Z" fill="black" />
          <path
            d="M192.959 131.52H185.279V139.2H192.959V131.52Z"
            fill="black"
          />
          <path d="M216 131.52H208.32V139.2H216V131.52Z" fill="black" />
          <path d="M39.3597 139.2H31.6797V146.88H39.3597V139.2Z" fill="black" />
          <path d="M54.7191 139.2H47.0391V146.88H54.7191V139.2Z" fill="black" />
          <path d="M100.799 139.2H93.1191V146.88H100.799V139.2Z" fill="black" />
          <path d="M116.16 139.2H108.48V146.88H116.16V139.2Z" fill="black" />
          <path d="M169.92 139.2H162.24V146.88H169.92V139.2Z" fill="black" />
          <path d="M177.6 139.2H169.92V146.88H177.6V139.2Z" fill="black" />
          <path d="M31.68 146.88H24V154.56H31.68V146.88Z" fill="black" />
          <path
            d="M39.3597 146.88H31.6797V154.56H39.3597V146.88Z"
            fill="black"
          />
          <path
            d="M47.0394 146.88H39.3594V154.56H47.0394V146.88Z"
            fill="black"
          />
          <path
            d="M54.7191 146.88H47.0391V154.56H54.7191V146.88Z"
            fill="black"
          />
          <path
            d="M62.4007 146.88H54.7207V154.56H62.4007V146.88Z"
            fill="black"
          />
          <path
            d="M77.7601 146.88H70.0801V154.56H77.7601V146.88Z"
            fill="black"
          />
          <path
            d="M93.1195 146.88H85.4395V154.56H93.1195V146.88Z"
            fill="black"
          />
          <path d="M123.84 146.88H116.16V154.56H123.84V146.88Z" fill="black" />
          <path d="M131.52 146.88H123.84V154.56H131.52V146.88Z" fill="black" />
          <path d="M139.2 146.88H131.52V154.56H139.2V146.88Z" fill="black" />
          <path
            d="M154.561 146.88H146.881V154.56H154.561V146.88Z"
            fill="black"
          />
          <path
            d="M162.241 146.88H154.561V154.56H162.241V146.88Z"
            fill="black"
          />
          <path d="M169.92 146.88H162.24V154.56H169.92V146.88Z" fill="black" />
          <path d="M177.6 146.88H169.92V154.56H177.6V146.88Z" fill="black" />
          <path d="M185.28 146.88H177.6V154.56H185.28V146.88Z" fill="black" />
          <path d="M216 146.88H208.32V154.56H216V146.88Z" fill="black" />
          <path
            d="M93.1195 154.56H85.4395V162.24H93.1195V154.56Z"
            fill="black"
          />
          <path
            d="M108.481 154.56H100.801V162.24H108.481V154.56Z"
            fill="black"
          />
          <path d="M123.84 154.56H116.16V162.24H123.84V154.56Z" fill="black" />
          <path d="M131.52 154.56H123.84V162.24H131.52V154.56Z" fill="black" />
          <path
            d="M154.561 154.56H146.881V162.24H154.561V154.56Z"
            fill="black"
          />
          <path d="M185.28 154.56H177.6V162.24H185.28V154.56Z" fill="black" />
          <path
            d="M93.1195 162.24H85.4395V169.92H93.1195V162.24Z"
            fill="black"
          />
          <path d="M116.16 162.24H108.48V169.92H116.16V162.24Z" fill="black" />
          <path d="M123.84 162.24H116.16V169.92H123.84V162.24Z" fill="black" />
          <path
            d="M146.879 162.24H139.199V169.92H146.879V162.24Z"
            fill="black"
          />
          <path
            d="M154.561 162.24H146.881V169.92H154.561V162.24Z"
            fill="black"
          />
          <path d="M169.92 162.24H162.24V169.92H169.92V162.24Z" fill="black" />
          <path d="M185.28 162.24H177.6V169.92H185.28V162.24Z" fill="black" />
          <path
            d="M192.959 162.24H185.279V169.92H192.959V162.24Z"
            fill="black"
          />
          <path
            d="M208.321 162.24H200.641V169.92H208.321V162.24Z"
            fill="black"
          />
          <path d="M216 162.24H208.32V169.92H216V162.24Z" fill="black" />
          <path
            d="M108.481 169.92H100.801V177.6H108.481V169.92Z"
            fill="black"
          />
          <path d="M123.84 169.92H116.16V177.6H123.84V169.92Z" fill="black" />
          <path
            d="M154.561 169.92H146.881V177.6H154.561V169.92Z"
            fill="black"
          />
          <path d="M185.28 169.92H177.6V177.6H185.28V169.92Z" fill="black" />
          <path
            d="M192.959 169.92H185.279V177.6H192.959V169.92Z"
            fill="black"
          />
          <path
            d="M200.641 169.92H192.961V177.6H200.641V169.92Z"
            fill="black"
          />
          <path
            d="M208.321 169.92H200.641V177.6H208.321V169.92Z"
            fill="black"
          />
          <path d="M216 169.92H208.32V177.6H216V169.92Z" fill="black" />
          <path d="M100.799 177.6H93.1191V185.28H100.799V177.6Z" fill="black" />
          <path d="M123.84 177.6H116.16V185.28H123.84V177.6Z" fill="black" />
          <path d="M146.879 177.6H139.199V185.28H146.879V177.6Z" fill="black" />
          <path d="M154.561 177.6H146.881V185.28H154.561V177.6Z" fill="black" />
          <path d="M162.241 177.6H154.561V185.28H162.241V177.6Z" fill="black" />
          <path d="M169.92 177.6H162.24V185.28H169.92V177.6Z" fill="black" />
          <path d="M177.6 177.6H169.92V185.28H177.6V177.6Z" fill="black" />
          <path d="M185.28 177.6H177.6V185.28H185.28V177.6Z" fill="black" />
          <path d="M200.641 177.6H192.961V185.28H200.641V177.6Z" fill="black" />
          <path d="M208.321 177.6H200.641V185.28H208.321V177.6Z" fill="black" />
          <path
            d="M93.1195 185.28H85.4395V192.96H93.1195V185.28Z"
            fill="black"
          />
          <path
            d="M100.799 185.28H93.1191V192.96H100.799V185.28Z"
            fill="black"
          />
          <path
            d="M108.481 185.28H100.801V192.96H108.481V185.28Z"
            fill="black"
          />
          <path d="M116.16 185.28H108.48V192.96H116.16V185.28Z" fill="black" />
          <path d="M131.52 185.28H123.84V192.96H131.52V185.28Z" fill="black" />
          <path d="M139.2 185.28H131.52V192.96H139.2V185.28Z" fill="black" />
          <path
            d="M146.879 185.28H139.199V192.96H146.879V185.28Z"
            fill="black"
          />
          <path
            d="M154.561 185.28H146.881V192.96H154.561V185.28Z"
            fill="black"
          />
          <path
            d="M162.241 185.28H154.561V192.96H162.241V185.28Z"
            fill="black"
          />
          <path d="M177.6 185.28H169.92V192.96H177.6V185.28Z" fill="black" />
          <path d="M185.28 185.28H177.6V192.96H185.28V185.28Z" fill="black" />
          <path
            d="M100.799 192.96H93.1191V200.64H100.799V192.96Z"
            fill="black"
          />
          <path d="M123.84 192.96H116.16V200.64H123.84V192.96Z" fill="black" />
          <path d="M139.2 192.96H131.52V200.64H139.2V192.96Z" fill="black" />
          <path
            d="M146.879 192.96H139.199V200.64H146.879V192.96Z"
            fill="black"
          />
          <path d="M177.6 192.96H169.92V200.64H177.6V192.96Z" fill="black" />
          <path
            d="M192.959 192.96H185.279V200.64H192.959V192.96Z"
            fill="black"
          />
          <path
            d="M200.641 192.96H192.961V200.64H200.641V192.96Z"
            fill="black"
          />
          <path d="M216 192.96H208.32V200.64H216V192.96Z" fill="black" />
          <path
            d="M93.1195 200.64H85.4395V208.32H93.1195V200.64Z"
            fill="black"
          />
          <path
            d="M154.561 200.64H146.881V208.32H154.561V200.64Z"
            fill="black"
          />
          <path
            d="M162.241 200.64H154.561V208.32H162.241V200.64Z"
            fill="black"
          />
          <path
            d="M192.959 200.64H185.279V208.32H192.959V200.64Z"
            fill="black"
          />
          <path
            d="M208.321 200.64H200.641V208.32H208.321V200.64Z"
            fill="black"
          />
          <path d="M216 200.64H208.32V208.32H216V200.64Z" fill="black" />
          <path d="M93.1195 208.32H85.4395V216H93.1195V208.32Z" fill="black" />
          <path d="M123.84 208.32H116.16V216H123.84V208.32Z" fill="black" />
          <path d="M139.2 208.32H131.52V216H139.2V208.32Z" fill="black" />
          <path d="M154.561 208.32H146.881V216H154.561V208.32Z" fill="black" />
          <path d="M185.28 208.32H177.6V216H185.28V208.32Z" fill="black" />
          <path d="M192.959 208.32H185.279V216H192.959V208.32Z" fill="black" />
          <path d="M208.321 208.32H200.641V216H208.321V208.32Z" fill="black" />
          <path d="M216 208.32H208.32V216H216V208.32Z" fill="black" />
          <g clipPath="url(#clip2_1_1832)">
            <path
              d="M25.628 23.9922C24.7295 23.9922 23.9922 24.7295 23.9922 25.628V31.6799V39.3599V47.0399V54.7199V62.3999V70.0799V76.1317C23.9922 77.0303 24.7218 77.7675 25.628 77.7675H76.1317C77.0303 77.7675 77.7675 77.0379 77.7675 76.1317V70.0799V62.3999V54.7199V47.0399V39.3599V31.6799V25.628C77.7675 24.7295 77.0379 23.9922 76.1317 23.9922H25.628ZM70.0799 39.3599V47.0399V54.7199V62.3999V69.1429C70.0799 69.6651 69.6575 70.0799 69.1429 70.0799H32.6168C32.0946 70.0799 31.6799 69.6575 31.6799 69.1429V62.3999V54.7199V47.0399V39.3599V32.6168C31.6799 32.0946 32.1023 31.6799 32.6168 31.6799H69.1429C69.6651 31.6799 70.0799 32.1023 70.0799 32.6168V39.3599Z"
              fill="black"
            />
          </g>
          <path
            d="M62.3992 54.7202V47.0402V40.9884C62.3992 40.0898 61.6696 39.3525 60.7634 39.3525H40.9874C40.0888 39.3525 39.3516 40.0821 39.3516 40.9884V47.0402V54.7202V60.7721C39.3516 61.6706 40.0812 62.4079 40.9874 62.4079H60.7634C61.662 62.4079 62.3992 61.6783 62.3992 60.7721V54.7202Z"
            fill="black"
          />
          <g clipPath="url(#clip3_1_1832)">
            <path
              d="M163.868 23.9922C162.97 23.9922 162.232 24.7295 162.232 25.628V31.6799V39.3599V47.0399V54.7199V62.3999V70.0799V76.1317C162.232 77.0303 162.962 77.7675 163.868 77.7675H214.372C215.271 77.7675 216.008 77.0379 216.008 76.1317V70.0799V62.3999V54.7199V47.0399V39.3599V31.6799V25.628C216.008 24.7295 215.278 23.9922 214.372 23.9922H163.868ZM208.32 39.3599V47.0399V54.7199V62.3999V69.1429C208.32 69.6651 207.898 70.0799 207.383 70.0799H170.857C170.335 70.0799 169.92 69.6575 169.92 69.1429V62.3999V54.7199V47.0399V39.3599V32.6168C169.92 32.0946 170.343 31.6799 170.857 31.6799H207.383C207.905 31.6799 208.32 32.1023 208.32 32.6168V39.3599Z"
              fill="black"
            />
          </g>
          <path
            d="M200.639 54.7202V47.0402V40.9884C200.639 40.0898 199.91 39.3525 199.004 39.3525H179.228C178.329 39.3525 177.592 40.0821 177.592 40.9884V47.0402V54.7202V60.7721C177.592 61.6706 178.321 62.4079 179.228 62.4079H199.004C199.902 62.4079 200.639 61.6783 200.639 60.7721V54.7202Z"
            fill="black"
          />
          <g clipPath="url(#clip4_1_1832)">
            <path
              d="M25.628 162.232C24.7295 162.232 23.9922 162.97 23.9922 163.868V169.92V177.6V185.28V192.96V200.64V208.32V214.372C23.9922 215.271 24.7218 216.008 25.628 216.008H76.1317C77.0303 216.008 77.7675 215.278 77.7675 214.372V208.32V200.64V192.96V185.28V177.6V169.92V163.868C77.7675 162.97 77.0379 162.232 76.1317 162.232H25.628ZM70.0799 177.6V185.28V192.96V200.64V207.383C70.0799 207.905 69.6575 208.32 69.1429 208.32H32.6168C32.0946 208.32 31.6799 207.898 31.6799 207.383V200.64V192.96V185.28V177.6V170.857C31.6799 170.335 32.1023 169.92 32.6168 169.92H69.1429C69.6651 169.92 70.0799 170.343 70.0799 170.857V177.6Z"
              fill="black"
            />
          </g>
          <path
            d="M62.3992 192.96V185.28V179.229C62.3992 178.33 61.6696 177.593 60.7634 177.593H40.9874C40.0888 177.593 39.3516 178.322 39.3516 179.229V185.28V192.96V199.012C39.3516 199.911 40.0812 200.648 40.9874 200.648H60.7634C61.662 200.648 62.3992 199.919 62.3992 199.012V192.96Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1832">
          <rect width="240" height="240" fill="white" />
        </clipPath>
        <clipPath id="clip1_1_1832">
          <rect width="240" height="240" fill="white" />
        </clipPath>
        <clipPath id="clip2_1_1832">
          <rect
            width="53.76"
            height="53.76"
            fill="white"
            transform="translate(24 24)"
          />
        </clipPath>
        <clipPath id="clip3_1_1832">
          <rect
            width="53.76"
            height="53.76"
            fill="white"
            transform="translate(162.24 24)"
          />
        </clipPath>
        <clipPath id="clip4_1_1832">
          <rect
            width="53.76"
            height="53.76"
            fill="white"
            transform="translate(24 162.24)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
