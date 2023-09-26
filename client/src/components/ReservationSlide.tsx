import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Component } from "react";
import Slider from "react-slick";

export default class CenterMode extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      cssEase: "linear",
    };
    return (
      <div className="overflow-hidden h-[15.5rem]">
        <Slider {...settings}>
          <div>
            <img src="/images/dream.jpg" alt="dream" />
          </div>
          <div>
            <img src="/images/dream1.png" alt="dream1" />
          </div>
          <div>
            <img src="/images/dream2.jpg" alt="dream2" />
          </div>
          <div>
            <img src="/images/dream3.jpg" alt="dream3" />
          </div>
          <div>
            <img src="/images/dream4.jpg" alt="dream4" />
          </div>
          <div>
            <img src="/images/dream5.jpg" alt="dream5" />
          </div>
          <div>
            <img src="/images/dream6.jpg" alt="dream6" />
          </div>
        </Slider>
      </div>
    );
  }
}
