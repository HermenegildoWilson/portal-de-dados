import { Typography, type TypographyProps } from "@mui/material";

export default function Title(typographyProps: TypographyProps) {
  const { children, sx } = typographyProps;
  return (
    <Typography
      variant={"h5"}
      fontWeight={700}
      sx={{
        fontSize: { xs: "1.4rem", md: "2rem" },
        color: "text.primary",
        mb: 2,
        ...sx,
      }}
      {...typographyProps}
    >
      {children}
    </Typography>
  );
}
