import React from "react";
import Slide from "./Slide";

interface Slide {
  key: string;
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
}

class VerticalCarousel extends React.Component<VerticalCarouselProps, VerticalCarouselState> {
  static defaultProps = {
    offsetRadius: 1,
    animationConfig: { tension: 120, friction: 14 },
  };

  constructor(props: VerticalCarouselProps) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  shouldComponentUpdate(nextProps: VerticalCarouselProps, nextState: VerticalCarouselState) {
    return (
      this.props.slides !== nextProps.slides ||
      this.props.goToSlide !== nextProps.goToSlide ||
      this.props.showNavigation !== nextProps.showNavigation ||
      this.props.offsetRadius !== nextProps.offsetRadius ||
      this.props.animationConfig !== nextProps.animationConfig ||
      this.state.index !== nextState.index
    );
  }

  modBySlidesLength(index: number): number {
    const { slides } = this.props;
    return ((index % slides.length) + slides.length) % slides.length;
  }

  moveSlide(direction: number): void {
    this.setState((prevState) => ({
      index: this.modBySlidesLength(prevState.index + direction),
    }));
  }

  clampOffsetRadius(offsetRadius: number): number {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);
    return Math.max(0, Math.min(offsetRadius, upperBound));
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
        <div>
          <button className="btn" onClick={() => this.moveSlide(1)}>&#8593;</button>
          <button className="btn" onClick={() => this.moveSlide(-1)}>&#8595;</button>
        </div>
      );
    }

    return (
      <>
        <div className="relative flex justify-center w-[100%] h-[100%]">
          {this.getPresentableSlides().map((slide, presentableIndex) => (
            <Slide
              key={slide.key}
              content={slide.content}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          ))}
        </div>
        {navigationButtons}
      </>
    );
  }
}

export default VerticalCarousel;

