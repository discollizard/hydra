import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { SPACING_UNIT, vars } from "../../theme.css";

export const textFieldContainer = style({
  flex: "1",
  gap: `${SPACING_UNIT}px`,
  display: "flex",
  flexDirection: "column",
});

export const textField = recipe({
  base: {
    display: "inline-flex",
    transition: "all ease 0.2s",
    width: "100%",
    alignItems: "center",
    borderRadius: "8px",
    border: `solid 1px ${vars.color.border}`,
    height: "40px",
    minHeight: "40px",
  },
  variants: {
    theme: {
      primary: {
        backgroundColor: vars.color.darkBackground,
      },
      dark: {
        backgroundColor: vars.color.background,
      },
    },
    hasError: {
      true: {
        borderColor: vars.color.danger,
      },
    },
    focused: {
      true: {
        borderColor: "#DADBE1",
      },
      false: {
        ":hover": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
  },
});

export const textFieldInput = recipe({
  base: {
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    height: "100%",
    outline: "none",
    color: "#DADBE1",
    cursor: "default",
    fontFamily: "inherit",
    textOverflow: "ellipsis",
    padding: `${SPACING_UNIT}px`,
    ":focus": {
      cursor: "text",
    },
  },
  variants: {
    readOnly: {
      true: {
        textOverflow: "inherit",
      },
    },
  },
});

export const togglePasswordButton = style({
  cursor: "pointer",
  color: vars.color.muted,
  padding: `${SPACING_UNIT}px`,
});

export const textFieldWrapper = style({
  display: "flex",
  gap: `${SPACING_UNIT}px`,
});

export const errorLabel = style({
  color: vars.color.danger,
});
