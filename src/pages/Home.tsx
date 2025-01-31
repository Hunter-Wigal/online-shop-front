import { Box } from "@mui/material";
import Carousel from "../components/Carousel";
import "../styles/home.scss";

export default function Home() {
  return (
    <>
        <Box>
          <div className="row">
            <div className="col-center">
              <h1>Online Shop</h1>
            </div>
          </div>
          <div className="row">
            <p className="intro col">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis netus
              lectus adipiscing congue nullam gravida euismod accumsan enim. Eget
              purus lacus urna cubilia praesent hendrerit posuere in eleifend. Ut
              hendrerit id velit nunc aliquet finibus. Nascetur inceptos interdum
              ut; malesuada integer nibh. Cursus consequat mi sociosqu iaculis
              rhoncus tempus. Netus in litora lectus; mi in lacinia aliquet
              senectus. Nisi parturient lacus venenatis tincidunt sit tempor
              platea tellus. <br/><br/>Hendrerit tempor maecenas in in parturient eu tortor.
              Nec eu ipsum est, dui nibh cras gravida etiam. Auctor bibendum
              imperdiet augue faucibus himenaeos metus. Ligula scelerisque
              ullamcorper consequat praesent non pulvinar convallis. Tincidunt
              erat rutrum dapibus condimentum libero in volutpat. Felis morbi
              facilisi etiam arcu pellentesque lorem. Facilisi laoreet habitant eu
              aenean condimentum auctor fusce dolor. Auctor ultricies nullam dui
              montes platea inceptos nostra.
            </p>
          </div>
          <div className="row">
              <div className="col">
                  <Carousel></Carousel>
              </div>
          </div>
        </Box>
    </>
  );
}
