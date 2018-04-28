import React, { Component } from "react";
import {
  Carousel,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Form,
  Button
} from "react-bootstrap";
import image1 from "../../img/Image1.jpg";
import image2 from "../../img/Image2.jpg";
import image3 from "../../img/Image3.jpg";
class LandingPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: 0,
      direction: null,
      value: ""
    };
  }
  styles = {
    image: {
      height: "auto",
      maxHeight: "100vh",
      minWidth: "auto",
      margin: "auto"
    }
    // imageContainer: { height: "60vh" }
  };

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return (
      <React.Fragment>
        <Carousel
          style={this.styles.imageContainer}
          activeIndex={this.state.index}
          direction={this.state.direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img style={this.styles.image} alt="engagement-1" src={image1} />
          </Carousel.Item>
          <Carousel.Item>
            <img style={this.styles.image} alt="engagement-2" src={image2} />
          </Carousel.Item>
          <Carousel.Item>
            <img style={this.styles.image} alt="engagement-3" src={image3} />
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    );
  }
}

export default LandingPage;
