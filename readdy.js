import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Create a custom theme
const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(to bottom right, #1a1a1a, #000000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  lightning: {
    position: "absolute",
    width: "2px",
    height: "150px",
    background: "white",
    boxShadow: "0px 0px 20px 5px white",
    opacity: 0,
    animation: "$lightningAnimation 3s infinite",
  },
  airplane: {
    position: "absolute",
    top: "30%",
    left: "-10%",
    fontSize: "48px",
    color: "#0d47a1",
    animation: "$flyAnimation 10s linear infinite",
    filter: "drop-shadow(0 0 10px rgba(0, 150, 255, 0.4))",
  },
  smoke: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "80px",
    height: "80px",
    background: "radial-gradient(circle, rgba(200, 200, 200, 0.4), transparent)",
    borderRadius: "50%",
    filter: "blur(10px)",
    animation: "$smokeAnimation 1.5s infinite alternate ease-in-out",
  },
  "@keyframes lightningAnimation": {
    "0%": { opacity: 0 },
    "10%": { opacity: 1 },
    "20%": { opacity: 0 },
    "30%": { opacity: 1 },
    "40%": { opacity: 0 },
    "100%": { opacity: 0 },
  },
  "@keyframes flyAnimation": {
    "0%": { left: "-10%" },
    "100%": { left: "110%" },
  },
  "@keyframes smokeAnimation": {
    "0%": { opacity: 0.4, transform: "scale(1)" },
    "100%": { opacity: 0.8, transform: "scale(1.4)" },
  },
  content: {
    position: "relative",
    zIndex: 1,
    width: "400px",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  input: {
    "& .MuiInputBase-input": {
      color: "#ffffff",
    },
    "& .MuiInputLabel-root": {
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2196f3",
      },
    },
  },
  button: {
    background: "linear-gradient(to right, #2196f3, #21cbf3)",
    color: "#ffffff",
    fontWeight: "bold",
    "&:hover": {
      background: "linear-gradient(to right, #1e88e5, #1de9b6)",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const lightningElements = document.querySelectorAll(".lightning");
    lightningElements.forEach((lightning, index) => {
      setTimeout(() => {
        lightning.style.animation = `lightningAnimation 3s infinite ${index}s`;
      }, index * 1000);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (username && password) {
        setShowError(false);
      } else {
        setShowError(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {/* Background Image */}
        <div className={classes.background}>
          <img
            src="https://public.readdy.ai/ai/img_res/9dddc900c5c7b74da141ee3c54fce935.jpg"
            alt="Storm background"
          />
        </div>

        {/* Lightning Effects */}
        <div className={`${classes.lightning} lightning`} style={{ top: "20%", left: "30%" }} />
        <div className={`${classes.lightning} lightning`} style={{ top: "40%", left: "60%" }} />
        <div className={`${classes.lightning} lightning`} style={{ top: "30%", left: "45%" }} />

        {/* Airplane Animation */}
        <i className={`fas fa-plane ${classes.airplane}`} />

        {/* Smoke Engine Glow */}
        <div className={classes.smoke} />

        {/* Login Form */}
        <Container className={classes.content}>
          <Typography variant="h4" align="center" gutterBottom style={{ color: "#ffffff", fontWeight: "bold" }}>
            Aviation Login
          </Typography>
          <Paper style={{ padding: "20px", background: "rgba(255,255,255,0.15)", borderRadius: "10px" }}>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                className={classes.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                className={classes.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
                style={{ color: "#ffffff" }}
              />
              <Button fullWidth type="submit" variant="contained" className={classes.button} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
              {showError && (
                <Typography align="center" style={{ color: "#ff6b6b", marginTop: "10px" }}>
                  Please enter valid credentials
                </Typography>
              )}
            </form>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
