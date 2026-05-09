import styled from "@emotion/styled";
import { getFontColor } from "../utils";
import { fadeIn, scale } from "./keyframes.styled";
import { Accordion, Button, css, TextField } from "@mui/material";
import { StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { reduceMotion } from ".";

export const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

export const CategoryElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 420px;
  background: ${({ theme }) => (theme.darkmode ? "#0c0d1a5a" : "#e8e8e85a")};
  overflow-y: auto;
  overflow-x: hidden;
  padding: 28px 24px;
  border-radius: 28px;
  gap: 10px;
  width: 440px;

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => getFontColor(theme.secondary)}20;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => getFontColor(theme.secondary)}40;
  }
  @media (max-width: 768px) {
    width: 92vw;
    padding: 20px 16px;
    border-radius: 24px;
  }
`;

export const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const CategoryElement = styled.div<{ clr: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 18px;
  border-radius: 20px;
  background: ${({ clr }) => clr};
  color: ${({ clr }) => getFontColor(clr)};
  box-shadow: 0 2px 8px -2px ${({ clr }) => clr}88;
  animation: ${fadeIn} 0.4s ease-out;
  transition: transform 0.2s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px -2px ${({ clr }) => clr}aa;
  }
  @media (max-width: 768px) {
    padding: 12px 14px;
    border-radius: 18px;
  }

  ${({ theme }) => reduceMotion(theme)}
`;

export const CategoryContent = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin: 0;
  gap: 8px;
  font-size: 16px;
  overflow: hidden;
`;

export const ActionButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CategoryInput = styled(TextField)`
  margin: 12px;

  .MuiOutlinedInput-root {
    border-radius: 18px;
    width: 400px;
    color: ${({ theme }) => getFontColor(theme.secondary)};
    background: ${({ theme }) => (theme.darkmode ? "#ffffff08" : "#ffffff60")};
    transition: 0.3s all;
    &:hover {
      background: ${({ theme }) => (theme.darkmode ? "#ffffff10" : "#ffffff80")};
    }
  }
  & .MuiFormHelperText-root {
    color: ${({ theme }) => getFontColor(theme.secondary)};
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    .MuiOutlinedInput-root {
      width: 92vw;
    }
  }
`;

export const EditNameInput = styled(TextField)`
  margin-top: 8px;
  .MuiOutlinedInput-root {
    border-radius: 18px;
    width: 350px;
  }
`;

export const AddCategoryButton = styled(Button)`
  border: none;
  padding: 16px 40px;
  font-size: 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => getFontColor(theme.primary)};
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s all;
  margin: 20px;
  width: 400px;
  text-transform: capitalize;
  box-shadow: 0 0 0 0 transparent;
  &:hover {
    box-shadow: 0px 0px 28px -4px ${({ theme }) => theme.primary + "a0"};
    background: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }
  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.6;
    color: white;
  }
  @media (max-width: 768px) {
    width: 92vw;
    font-size: 18px;
    padding: 14px 32px;
  }
`;

export const AssociatedTasksAccordion = styled(Accordion)`
  margin: 16px 0;
  background: transparent;
  box-shadow: none;
  border: 2px solid ${({ theme }) => `${theme.darkmode ? "#ffffff" : "#000000"}5a`};
  border-radius: 12px !important;
`;

const StarIconStyles = css`
  animation: ${scale} 0.2s ease-in;
`;

export const StarChecked = styled(StarRounded)`
  ${StarIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;

export const StarUnchecked = styled(StarOutlineRounded)`
  ${StarIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;
