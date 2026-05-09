import styled from "@emotion/styled";
import { fadeIn, progressPulse, pulseAnimation, scale } from "./keyframes.styled";
import { Box, Button, CircularProgress, css, IconButton } from "@mui/material";
import { getFontColor, isDark } from "../utils";
import { reduceMotion } from ".";

export const GreetingHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-left: 8px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  gap: 6px;

  @media (max-width: 550px) {
    font-size: 22px;
  }
  @media print {
    display: none;
  }
`;

export const TasksCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media print {
    display: none;
  }
`;

export const TasksCount = styled.div<{ glow: boolean }>`
  position: relative;
  color: ${({ theme }) => getFontColor(theme.secondary)};
  background: ${({ theme }) => (isDark(theme.secondary) ? "#11132b7a" : "#ffffff48")};
  transition: 0.3s all;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 8px 16px;
  padding: 20px 24px;
  margin: 20px 0 16px 0;
  border-radius: 28px;
  width: 650px;
  border: 1px solid ${({ theme }) => (isDark(theme.secondary) ? "#2e3068a0" : theme.primary)};
  box-shadow: ${({ glow, theme }) =>
    glow ? `0 0 40px -12px ${theme.primary}44` : "none"};

  @media (min-width: 1024px) {
    padding: 24px 28px;
  }
`;

export const TaskCountClose = styled(IconButton)`
  position: absolute;
  top: 14px;
  right: 14px;
  opacity: 0.6;
  color: ${({ theme }) => getFontColor(theme.secondary)};
  transition: 0.2s opacity;
  &:hover {
    opacity: 1;
  }
`;

export const TaskCountTextContainer = styled.div`
  line-height: 1.7;
  margin-left: 6px;
`;

export const TaskCountHeader = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;

export const TaskCompletionText = styled.p`
  margin: 2px 0 0 0;
  font-size: 15px;
  opacity: 0.75;
`;

export const ProgressPercentageContainer = styled(Box)<{ glow: boolean }>`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2287" : "#ffffff5c")};
  border-radius: 100px;
  margin: -5px;
  border: 2px solid ${({ theme }) => (isDark(theme.secondary) ? "#44479cb7" : theme.primary)};
  box-shadow: ${({ theme }) => `0 0 18px -2px ${isDark(theme.secondary) ? "#090b22" : "#bababa"}`};
  & .MuiTypography-root {
    color: ${({ theme }) => getFontColor(theme.secondary)};
  }
  animation: ${({ theme, glow }) =>
    glow
      ? css`
          ${progressPulse(theme.primary)} 4s infinite ease-in
        `
      : "none"};

  ${({ theme }) => reduceMotion(theme)}
`;

export const StyledProgress = styled(CircularProgress)<{ glow: boolean }>`
  z-index: 1;
  margin: 2px;
  filter: ${({ glow, theme }) => (glow ? `drop-shadow(0 0 6px ${theme.primary}c8)` : "none")};
  transition: 0.3s filter;
`;

export const AddButton = styled(Button)<{ animate?: boolean; glow: boolean }>`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 24px;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => getFontColor(theme.primary)};
  right: 16vw;
  box-shadow: ${({ glow, theme }) => (glow ? `0px 0px 32px -8px ${theme}` : "none")};
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s,
    box-shadow 0.3s,
    transform 0.2s;

  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => theme.primary};
    backdrop-filter: blur(6px);
    transform: scale(1.06);
  }

  animation: ${scale} 0.5s;
  ${({ animate, theme }) =>
    animate &&
    css`
      animation: ${pulseAnimation(theme.primary, 14)} 1.2s infinite;
    `}

  ${({ theme }) => reduceMotion(theme)}

  @media (max-width: 1024px) {
    right: 24px;
  }

  @media print {
    display: none;
  }
`;

export const Offline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  opacity: 0.7;
  font-weight: 500;
  font-size: 15px;
  animation: ${fadeIn} 0.5s ease;
`;
