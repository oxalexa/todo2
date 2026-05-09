import { Avatar, Chip, ChipProps, styled } from "@mui/material";
import { LabelRounded } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import type { Category } from "../types/user";
import { getFontColor } from "../utils";

interface CategoryBadgeProps extends ChipProps, StyledBadgeProps {
  category: Category;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, ...props }) => {
  const { user } = useContext(UserContext);
  const { settings } = user;

  return (
    <StyledCategoryBadge
      key={category.id}
      label={category.name}
      variant="outlined"
      backgroundclr={category.color}
      glow={settings.enableGlow}
      translate="no"
      avatar={
        <Avatar alt={category.name} sx={{ background: "transparent", borderRadius: "0px", width: 24, height: 24 }}>
          <LabelRounded sx={{ fontSize: 18, color: getFontColor(category.color) }} />
        </Avatar>
      }
      {...props}
    />
  );
};

interface StyledBadgeProps {
  backgroundclr?: string;
  borderclr?: string;
  glow?: boolean;
  list?: boolean | string;
}

export const StyledCategoryBadge = styled(Chip)<StyledBadgeProps>`
  color: ${({ backgroundclr }) => getFontColor(backgroundclr || "")};
  background-color: ${({ backgroundclr }) => backgroundclr};
  box-shadow: ${({ glow, backgroundclr }) => (glow ? `0 0 8px 0 ${backgroundclr}` : "none")};
  border: ${({ borderclr }) => (borderclr ? `1px solid ${borderclr}` : "none")};
  font-weight: 600;
  font-size: 13px;
  margin: 4px 0 0 0;
  padding: 4px 6px;
  border-radius: 10px;
  transition: 0.3s all;

  &:hover {
    background-color: ${({ backgroundclr }) => `${backgroundclr} !important`};
    opacity: ${({ list }) => list && 0.7};
  }

  &:focus-visible {
    opacity: 0.5;
    background-color: ${({ backgroundclr }) => backgroundclr};
  }

  & .MuiChip-deleteIcon {
    color: ${({ backgroundclr }) => getFontColor(backgroundclr || "")};
    transition: 0.3s all;
    width: 20px;
    height: 20px;
    stroke: transparent;

    @media (max-width: 1024px) {
      width: 24px;
      height: 24px;
    }

    &:hover {
      color: ${({ backgroundclr }) => getFontColor(backgroundclr || "")};
    }
  }
  @media print {
    box-shadow: none;
    border: 1px solid black;
    background-color: white;
    color: black;
  }
`;
