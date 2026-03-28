import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";

type AppLoaderProps = CircularProgressProps & {
  type?: string;
};

export default function AppLoader(appLoaderProps: AppLoaderProps) {
  const { type, sx } = appLoaderProps;

  if (type === "small") {
    return (
      <CircularProgress sx={{ ml: 1, color: "divider", ...sx }} size={20} />
    );
  }

  return (
    <CircularProgress
      sx={{ color: "primary.main", ...sx }}
      thickness={5}
      enableTrackSlot
      size={50}
    />
  );
}
