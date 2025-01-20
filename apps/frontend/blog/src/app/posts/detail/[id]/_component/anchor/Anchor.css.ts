import { style } from "@vanilla-extract/css";

export const anchorContainer = style({
  position: "sticky",
  top: "72px",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  height: "70%",
  maxHeight: "600px",
  paddingLeft: "50px",
  boxSizing: "border-box",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "5px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#e6e6e6",
    borderRadius: "2.5px",
    transition: "all 0.2s ease-out",
  },
});
