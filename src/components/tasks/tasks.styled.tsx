import styled from "@emotion/styled";
import { Alarm, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, IconButton, TextField, css } from "@mui/material";
import { fadeIn, ring, scale } from "../../styles/keyframes.styled";
import { ColorPalette } from "../../theme/themeConfig";
import { getFontColor, isDark, systemInfo } from "../../utils";
import { reduceMotion } from "../../styles/reduceMotion.styled";

interface TaskComponentProps {
  backgroundColor: string;
  done: boolean;
  glow?: boolean;
  blur?: boolean;
  isDragging?: boolean;
}

export const TaskContainer = styled.div<TaskComponentProps>`
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 20px;
  border-radius: 24px;
  margin-top: 12px;
  transition: ${({ isDragging }) =>
    isDragging ? "none" : "border-left 0.2s, opacity 0.4s, filter 0.3s, box-shadow 0.3s, transform 0.2s"};
  color: ${({ backgroundColor }) => getFontColor(backgroundColor)};
  background-color: ${({ backgroundColor, done }) => `${backgroundColor}${done ? "cc" : ""}`};
  opacity: ${({ done }) => (done ? 0.75 : 1)};
  border-left: ${({ done }) => (done ? "6px solid #00e676" : "1px solid transparent")};
  box-shadow: ${(props) =>
    props.glow && !props.blur ? `0 0 96px -20px ${props.backgroundColor}` : "none"};
  filter: ${({ blur }) => (blur ? "blur(2px) opacity(75%)" : "none")};
  backdrop-filter: ${({ done }) => (done ? "blur(6px)" : "none")};

  *::selection {
    background-color: ${({ theme, backgroundColor }) =>
      theme.primary === backgroundColor ? "#ffffff" : theme.primary} !important;
    color: ${({ theme, backgroundColor }) =>
      theme.primary === backgroundColor ? "#000000" : getFontColor(theme.primary)} !important;
  }

  ${({ theme }) => reduceMotion(theme)}

  @media (max-width: 768px) {
    padding: 14px 14px 14px 18px;
    margin-top: 10px;
  }
  @media print {
    break-inside: avoid;
    page-break-inside: avoid;
    background-color: #d62b2b;
    color: black;
    box-shadow: none;
    border: 2px solid black;
  }
`;

export const IconBadge = styled.span<{ clr: string; done?: boolean }>`
  text-decoration: none;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ clr, done }) =>
    done
      ? (clr === ColorPalette.fontDark ? "#00e67633" : "#00e67622")
      : (clr === ColorPalette.fontDark ? "#ffffff18" : "#00000015")};
  color: ${({ clr }) => clr};
  font-size: 24px;
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  flex-shrink: 0;
  transition: 0.3s background-color;
  @media print {
    background-color: white;
    color: black;
    box-shadow: none;
    border: 2px solid black;
  }
`;

export const TaskCategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
  justify-content: left;
  align-items: center;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

export const TaskName = styled.h3<{ done: boolean }>`
  font-size: 19px;
  margin: 0;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
  white-space: pre-line;
  font-weight: 600;
  line-height: 1.3;
`;

export const TaskDate = styled.p`
  margin: 0;
  text-align: right;
  margin-left: 8px;
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  opacity: 0.7;
  backdrop-filter: none !important;
  flex-shrink: 0;
`;

export const TaskDescription = styled.div<{ done: boolean }>`
  margin: 2px 0 0 0;
  font-size: 16px;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
  opacity: 0.85;
  line-height: 1.4;
`;

export const NoTasks = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  opacity: 0.9;
  font-size: 18px;
  & span {
    font-weight: bold;
  }
`;

export const TaskNotFound = styled.div`
  text-align: center;
  font-size: 20px;
  opacity: 0.9;
  margin-top: 18px;
  animation: ${fadeIn} 0.5s ease-in;
  ${({ theme }) => reduceMotion(theme)}
`;

export const TasksContainer = styled.main`
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  flex-direction: column;
  gap: 6px;
`;

export const TimeLeft = styled.span<{ done: boolean }>`
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  transition: 0.3s all;
  font-size: 14px;
  margin: 4px 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  backdrop-filter: none !important;
  opacity: 0.8;
  @media (max-width: 768px) {
    font-size: 13px;
  }
  & font {
    margin: 0 1px;
  }
`;

export const SharedByContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  opacity: 0.75;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const DragHandle = styled.span`
  display: flex;
  align-items: center;
  padding: 6px;
  cursor: grab;
  opacity: 0.6;
`;

export const Pinned = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 4px;
  opacity: 0.65;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
`;

export const TaskActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2287" : "#ffffff5c")};
  padding: 16px 20px;
  border-radius: 18px;
  position: sticky;
  top: ${systemInfo.os === "iOS" ? "52" : "60"}px;
  z-index: 1;
  backdrop-filter: blur(24px);

  animation: ${fadeIn} 0.3s ease-in;
  ${({ theme }) => reduceMotion(theme)}

  & h3 {
    margin: 0;
    display: flex;
    align-items: center;
  }
  & font {
    margin: 0 1px;
  }
`;

export const StyledRadio = styled(Checkbox)<{ clr: string }>`
  margin-left: -8px;
  margin-right: 4px;
  color: ${({ clr }) => clr} !important;
  animation: ${fadeIn} 0.3s ease-in;
  &.Mui-checked {
    color: ${({ clr }) => clr} !important;
  }
  ${({ theme }) => reduceMotion(theme)}
`;

const radioIconStyles = css`
  animation: ${scale} 0.2s ease-in;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const RadioChecked = styled(RadioButtonChecked)`
  ${radioIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;

export const RadioUnchecked = styled(RadioButtonUnchecked)`
  ${radioIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;

export const CategoriesListContainer = styled.div`
  position: sticky;
  background: transparent;
  backdrop-filter: blur(24px);
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 8px;
  overflow-x: auto;
  padding: 0 0 6px 0;
  margin: 8px 0;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => getFontColor(theme.secondary)}15;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => getFontColor(theme.secondary)}30;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => getFontColor(theme.secondary)}50;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: ${({ theme }) => getFontColor(theme.secondary)}15;
  }
  @media print {
    display: none;
  }
`;

export const HighlightedText = styled.span`
  background-color: #6829ef;
  color: #fff;
  padding: 2px 0;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  margin: 0;
  font-weight: bold;
  border: 1px solid #ffffff5f;
  transition: 0.3s all;
`;

export const SearchInput = styled(TextField)`
  border-radius: 16px;
  transition: 0.3s all;
  width: 100%;

  & .MuiOutlinedInput-root {
    padding: 2px 16px;
    border-radius: 16px;
    transition: 0.3s all;
    background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2258" : "#ffffff3e")};
    color: ${({ theme }) => getFontColor(theme.secondary)};

    & .MuiSvgIcon-root {
      color: ${({ theme }) => getFontColor(theme.secondary)};
    }

    &.Mui-focused {
      background: ${({ theme }) => (isDark(theme.secondary) ? "#090b228e" : "#ffffff8e")};
      box-shadow: ${({ theme }) =>
        isDark(theme.secondary) ? "0 0 0 4px #1a1e4a7f" : `0 0 0 4px ${theme.primary}64`};
    }
    &.Mui-focused .MuiSvgIcon-root {
      animation: ${scale} 0.3s ease-in-out;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2px solid ${({ theme }) => theme.primary};
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ theme }) => (isDark(theme.secondary) ? "#44479cb7" : theme.primary)} !important;
    transition: 0.3s border;
  }

  @media print {
    display: none;
  }
`;

export const SearchClear = styled(IconButton)`
  animation: ${scale} 0.3s ease;
  transition: 0.3s all;
`;

const ringAnimation = "2s 0.5s ease-in-out infinite";

export const RingAlarm = styled(Alarm)<{ animate?: boolean }>`
  color: red;
  ${({ animate }) =>
    animate &&
    css`
      -webkit-animation: ${ring} ${ringAnimation};
      -moz-animation: ${ring} ${ringAnimation};
      animation: ${ring} ${ringAnimation};
    `}
  @media print {
    color: black !important;
    -webkit-animation: none;
    -moz-animation: none;
    animation: none;
  }
  ${({ theme }) => reduceMotion(theme)}
`;

export const TaskActionsContainer = styled.div`
  @media print {
    display: none;
  }
`;
