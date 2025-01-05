import { SPACING_UNIT, vars } from "../../../theme.css";
import { style } from "@vanilla-extract/css";

export const friendListDisplayName = style({
  fontWeight: "bold",
  fontSize: vars.size.body,
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const friendListContainer = style({
  display: "flex",
  gap: `${SPACING_UNIT * 3}px`,
  alignItems: "center",
  borderRadius: "4px",
  border: `solid 1px ${vars.color.border}`,
  width: "100%",
  height: "54px",
  minHeight: "54px",
  transition: "all ease 0.2s",
  position: "relative",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

export const friendListButton = style({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  cursor: "pointer",
  height: "100%",
  width: "100%",
  flexDirection: "row",
  color: vars.color.body,
  gap: `${SPACING_UNIT + SPACING_UNIT / 2}px`,
  padding: `0 ${SPACING_UNIT}px`,
});

export const friendRequestItem = style({
  color: vars.color.body,
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

export const acceptRequestButton = style({
  cursor: "pointer",
  color: vars.color.body,
  width: "28px",
  height: "28px",
  ":hover": {
    color: vars.color.success,
  },
});

export const cancelRequestButton = style({
  cursor: "pointer",
  color: vars.color.body,
  width: "28px",
  height: "28px",
  ":hover": {
    color: vars.color.danger,
  },
});

export const friendCodeButton = style({
  color: vars.color.body,
  cursor: "pointer",
  display: "flex",
  gap: `${SPACING_UNIT / 2}px`,
  alignItems: "center",
  transition: "all ease 0.2s",
  ":hover": {
    color: vars.color.muted,
  },
});
