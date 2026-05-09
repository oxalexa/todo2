import {
  AddRounded,
  CategoryRounded,
  DownloadRounded,
  PersonRounded,
  CheckCircleOutlineRounded,
} from "@mui/icons-material";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  css,
  styled,
  useTheme,
} from "@mui/material";
import { JSX, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useResponsiveDisplay } from "../hooks/useResponsiveDisplay";
import { pulseAnimation, slideInBottom } from "../styles";
import { getFontColor } from "../utils";

export const BottomNav = (): JSX.Element | null => {
  const { user } = useContext(UserContext);
  const { tasks, settings } = user;
  const [value, setValue] = useState<number | undefined>();

  const theme = useTheme();
  const n = useNavigate();
  const isMobile = useResponsiveDisplay();
  const location = useLocation();

  const smallIconSize = "28px";

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts[1] === "task") {
      setValue(0);
    } else {
      switch (location.pathname) {
        case "/categories":
          setValue(1);
          break;
        case "/add":
          setValue(2);
          break;
        case "/transfer":
          setValue(3);
          break;
        case "/user":
          setValue(4);
          break;
        case "/":
          setValue(0);
          break;
        default:
          setValue(undefined);
      }
    }
  }, [location.pathname]);

  if (!isMobile) {
    return null;
  }

  return (
    <Container>
      <StyledBottomNavigation
        showLabels
        glow={settings.enableGlow}
        value={value}
        onChange={(_event, newValue: number) => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setValue(newValue);
        }}
      >
        <NavigationButton
          onClick={() => n("/")}
          label="Tasks"
          icon={
            <Badge
              color="primary"
              badgeContent={value !== 0 ? tasks.filter((task) => !task.done).length : undefined}
              max={99}
            >
              <CheckCircleOutlineRounded sx={{ fontSize: smallIconSize }} />
            </Badge>
          }
        />
        <NavigationButton
          onClick={() => n("/categories")}
          label="Categories"
          icon={<CategoryRounded sx={{ fontSize: smallIconSize }} />}
          disabled={!settings.enableCategories}
        />

        <NavigationButton
          onClick={() => n("add")}
          showLabel={false}
          aria-label="Add"
          icon={
            <AddIconContainer
              clr={theme.palette.primary.main}
              animate={tasks.length === 0 && value !== 2}
            >
              <AddIcon clr={theme.palette.primary.main} fontSize="large" />
            </AddIconContainer>
          }
        />
        <NavigationButton
          onClick={() => n("transfer")}
          label="Transfer"
          icon={<DownloadRounded sx={{ fontSize: smallIconSize }} />}
        />
        <NavigationButton
          onClick={() => n("user")}
          label="Profile"
          icon={<PersonRounded sx={{ fontSize: smallIconSize }} />}
        />
      </StyledBottomNavigation>
    </Container>
  );
};

const AddIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "animate" && prop !== "clr",
})<{ clr: string; animate: boolean }>`
  border-radius: 100px;
  padding: 0;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ animate, theme }) =>
    animate &&
    css`
      animation: ${pulseAnimation(theme.palette.primary.main, 10)} 1.2s infinite;
    `};
`;

const AddIcon = styled(AddRounded)<{ clr: string }>`
  border: 2px solid ${({ clr }) => clr};
  background-color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 36px;
  border-radius: 100px;
  padding: 6px;
  margin: 0 !important;
  transition: background 0.3s;
`;

const Container = styled(Box)`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  animation: ${slideInBottom} 0.5s ease;
  z-index: 999;
`;

const StyledBottomNavigation = styled(BottomNavigation, {
  shouldForwardProp: (prop) => prop !== "glow",
})<{ glow: boolean }>`
  background: ${({ theme, glow }) => `${theme.palette.secondary.main}${glow ? "c8" : "e6"}`};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  margin: 0px 20px 0px -20px;
  padding: 14px 10px 28px 10px;
  transition:
    0.3s background,
    color;
  @media print {
    display: none;
  }
`;

const NavigationButton = styled(BottomNavigationAction)`
  border-radius: 16px;
  margin: 4px;
  color: ${({ theme }) => getFontColor(theme.palette.secondary.main)};
  min-width: 56px;

  &:disabled {
    opacity: 0.5;
    & .MuiBottomNavigationAction-label {
      text-shadow: none;
    }
  }

  & .MuiBottomNavigationAction-label {
    font-size: 12px !important;
    font-weight: 500;
  }

  & .Mui-selected {
    font-weight: 600;
  }
`;
