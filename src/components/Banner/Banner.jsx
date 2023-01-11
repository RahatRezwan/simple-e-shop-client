import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Autoplay } from "swiper";

const Banner = () => {
   return (
      <div>
         <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={true}
            loop={true}
            keyboard={{
               enabled: true,
            }}
            pagination={{
               clickable: true,
            }}
            modules={[Keyboard, Pagination, Autoplay]}
            className="mySwiper w-full m-0 p-0"
         >
            {/* slide 1 */}
            <SwiperSlide className="m-0 p-0 static">
               <div className="w-full mx-auto min-h-[500px] h-[600px] bg-cover bg-no-repeat bg-center flex justify-center items-center">
                  <img
                     src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2dbe9e99759469.5efa141005230.png"
                     alt=""
                     className="w-full h-full"
                  />
               </div>
            </SwiperSlide>

            {/* slide 2 */}
            <SwiperSlide className="m-0 p-0">
               <div className="w-full mx-aut0 min-h-[500px] h-[600px] bg-cover bg-no-repeat bg-center flex justify-center items-center">
                  <img
                     src="https://img.indiefolio.com/fit-in/1100x0/filters:format(webp):fill(transparent)/project/body/adc3928a5217adbc990ac62df935b5e8.jpg"
                     alt=""
                     className="w-full h-full"
                  />
               </div>
            </SwiperSlide>
            {/* slide 3 */}
            <SwiperSlide className="m-0 p-0">
               <div className="w-full mx-aut0 min-h-[500px] h-[600px] bg-cover bg-no-repeat bg-center flex justify-center items-center">
                  <img
                     src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/06818099759469.60ae86d71be78.png"
                     alt=""
                     className="w-full h-full"
                  />
               </div>
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default Banner;
