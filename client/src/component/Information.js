import React from "react";
import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import p3 from "../images/3.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./component.css";
import { Navigation } from "swiper";
function Information(){

    return(
        <div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper" >
                <SwiperSlide>><img src={p1}/></SwiperSlide>
                <SwiperSlide><img src={p2}/></SwiperSlide>
                <SwiperSlide><img src={p3}/></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Information;