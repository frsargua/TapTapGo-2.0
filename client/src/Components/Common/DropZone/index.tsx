import { Card, CardContent, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const img = {
  objectFit: "contain",
  height: "100px",
  width: "auto",
  borderRadius: 2,
};

export default function DropZone({ updateImage, files }) {
  // const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 4,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      updateImage(
        acceptedFiles.map((file) => {
          return {
            imageLink: Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          };
        })
      );
    },
  });

  const thumbs = files.map((file) => (
    <Stack
      sx={{
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 1,
        marginRight: 2,
        padding: 0.5,
        boxSizing: "border-box",
      }}
      key={file.imageLink.name}
    >
      <Box sx={{ minWidth: 0, overflow: "hidden" }}>
        <img
          src={file.imageLink.preview}
          style={img}
          alt="Thumbnail of uploaded image"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </Box>
    </Stack>
  ));

  useEffect(() => {
    console.log(files);
  }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box sx={{ width: "100%", mt: "1.5rem" }}>
      <Box
        sx={{ border: "2px dashed grey" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Typography marginY="1rem" textAlign="center">
          Drag 'n' drop some files here, or click to select files
        </Typography>
      </Box>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Box>
  );
}
