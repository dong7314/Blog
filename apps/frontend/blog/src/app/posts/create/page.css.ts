import { style } from "@vanilla-extract/css";

export const create = style({
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  paddingBlock: "32px",
  boxSizing: "border-box",
});

export const createInfo = style({
  display: "flex",
  flexDirection: "column",
  width: "calc(50% - 54px)",
  paddingRight: "32px",
  marginRight: "32px",
  borderRight: "1px solid #dbdbdb",
  boxSizing: "border-box",
});

export const createInputLabel = style({
  marginLeft: "2px",
  marginBottom: "6px",
});

export const createInput = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "16px",
  selectors: {
    "&:nth-last-of-type(1)": {
      marginBottom: "0",
    },
  },
});

export const createTextarea = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "130px",
});

export const createLabel = style({
  marginLeft: "2px",
  marginBottom: "6px",
});

export const exampleSeries = style({
  height: "300px",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
});
