
import main from "./images/main.png";
import "./pages/Home.css";
import { Typography, Box } from "@mui/material";
import Cards from "./pages/Cards";
import { Typewriter } from "react-simple-typewriter";



export default function Home() {
  return (
    <>
      <div className="home">

        <div className="left">
          <h1>
            <Typewriter
              words={[
                "Welcome to One Restro",
                "Delicious Food Awaits",
                "Manage Your Menu Easily"
              ]}
              loop={0} // 0 = infinite
              cursor
              cursorStyle="|"
              typeSpeed={120}
              deleteSpeed={90}
              delaySpeed={1500}
            />
          </h1>
          <h3>Best in class foods</h3>
          <br></br>
          <p>A dosa is a traditional South Indian fermented crepe made from rice and urad dal. When the naturally fermented batter hits a
            hot griddle, it spreads thin, crisps at the edges, stays soft at the centre, and develops a subtle tang.</p>
        </div>

        <div className="right">
          <img src={main} alt="food" />
        </div>

      </div>
      <Box>
        <Typography sx={{ margin: 5 }}  >
          These Are Also Famous HERE
        </Typography>
      </Box>
      <Cards />

    </>
  );
}