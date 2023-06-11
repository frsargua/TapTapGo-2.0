import { Skeleton } from "@mui/material";

function FormSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        height={20}
        variant="text"
        sx={{ fontSize: "1rem", my: "1rem" }}
      />
      <Skeleton
        variant="rectangular"
        height={40}
        animation="wave"
        sx={{ marginBottom: "1rem" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        height={20}
        sx={{ fontSize: "1rem", marginBottom: "1rem" }}
      />
      <Skeleton variant="rectangular" height={40} animation="wave" />
      <Skeleton
        animation="wave"
        variant="text"
        height={20}
        sx={{ fontSize: "1rem", marginBottom: "1rem" }}
      />
      <Skeleton variant="rectangular" height={40} animation="wave" />
      <Skeleton
        animation="wave"
        variant="text"
        height={20}
        sx={{ fontSize: "1rem", marginBottom: "1rem" }}
      />
      <Skeleton variant="rectangular" height={40} animation="wave" />
    </>
  );
}

export default FormSkeleton;
