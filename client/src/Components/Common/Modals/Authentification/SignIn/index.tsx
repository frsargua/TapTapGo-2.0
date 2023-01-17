import { ChangeEvent, FunctionComponent, useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";
import Copyright from "../CopyRight";
import { ModalContext } from "../../../../../contexts/ModalContext";

interface SignInProps {
  switchToSignUp: () => void;
}

export const SignIn: FunctionComponent<SignInProps> = ({ switchToSignUp }) => {
  const { closeModal } = useContext(ModalContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Boolean>(false);

  const handleFormSubmit = async (event: ChangeEvent<any>) => {
    event.preventDefault();
    // try {
    //   const { data } = await login({
    //     variables: { input: { email: email, password: password } },
    //   });

    //   if (data) {
    //     Auth.login(data.login.token);
    //     // TODO: need to figure out how to setLoggedIn state to true. need to consider context/redux.
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    setEmail("");
    setPassword("");
  };

  return (
    <div
      onClick={closeModal}
      value="CloseBox"
      id="modalBox"
      component="div"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
        position: "fixed",
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Card
        sx={{
          width: { xs: "95%", sm: "600px" },
          maxWidth: "90%",
          backgroundColor: "white",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              name="email"
              autoComplete="email"
              placeholder="Aaron99@hotmail.com"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="password is : password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error ? (
              <Typography variant="body1" color="red">
                Wrong user fields
              </Typography>
            ) : null}
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography
                  href="#"
                  variant="body2"
                  component="a"
                  sx={{ textDecoration: "none" }}
                >
                  Forgot password?
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  onClick={switchToSignUp}
                  href="#"
                  variant="body2"
                  component="a"
                  sx={{ textDecoration: "none" }}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Card>
    </div>
  );
};
