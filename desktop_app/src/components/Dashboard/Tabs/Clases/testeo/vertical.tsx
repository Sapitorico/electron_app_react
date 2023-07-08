import React, { Component, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";
import PropTypes from "prop-types";

interface Slide {
  key: any;
  content: React.ReactNode;
}

interface VerticalCarouselProps {
  slides: Slide[];
  goToSlide?: number;
  showNavigation?: boolean;
  offsetRadius?: number;
  animationConfig?: {
    tension: number;
    friction: number;
  };
}

interface VerticalCarouselState {
  index: number;
  goToSlide: number | null;
  prevPropsGoToSlide: number;
  newSlide: boolean;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;
  height: 60px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;
  z-index: 1000;
`;

const NavBtn = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 3px;
`;

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

class VerticalCarousel extends Component<VerticalCarouselProps, VerticalCarouselState> {
  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object,
      })
    ).isRequired,
    goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    animationConfig: PropTypes.object,
  };

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 },
  };

  constructor(props: VerticalCarouselProps) {
    super(props);
    this.state = {
      index: 0,
      goToSlide: null,
      prevPropsGoToSlide: 0,
      newSlide: false,
    };
  }

  componentDidMount = (): void => {
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentWillUnmount = (): void => {
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.keyCode === 38) {
      this.moveSlide(-1);
    }
    if (event.keyCode === 40) {
      this.moveSlide(1);
    }
  };

  modBySlidesLength = (index: number): number => {
    return mod(index, this.props.slides.length);
  };

  moveSlide = (direction: number): void => {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null,
    });
  };

  clampOffsetRadius(offsetRadius: number): number {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides(): Slide[] {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides: Slide[] = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  render() {
    const { animationConfig, offsetRadius, showNavigation } = this.props;

    let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = (
        <NavigationButtons>
          <NavBtn onClick={() => this.moveSlide(1)}>&#8593;</NavBtn>
          <NavBtn onClick={() => this.moveSlide(-1)}>&#8595;</NavBtn>
        </NavigationButtons>
      );
    }
    return (
      <>
        <Wrapper>
          {this.getPresentableSlides().map((slide, presentableIndex) => (
            <Slide
              key={slide.key}
              content={slide.content}
              moveSlide={this.moveSlide}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          ))}
        </Wrapper>
        {navigationButtons}
      </>
    );
  }
}

export default VerticalCarousel;
