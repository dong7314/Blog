import { style } from "@vanilla-extract/css";

export const modalContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  opacity: 0,
  transition: "opacity .1s ease-out",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99999,
});

export const modalContainerOpen = style({
  opacity: 1,
});

export const modal = style({
  display: "flex",
  flexDirection: "column",
  padding: "24px 24px",
  backgroundColor: "#fff",
  border: "1px solid #ededed",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.08)",
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
});

export const modalTitle = style({
  lineHeight: "150%",
});

export const modalContent = style({
  display: "flex",
  height: "100%",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "5px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#a5a5a5",
    borderRadius: "2.5px",
    transition: "all 0.2s ease-out",
  },
});
