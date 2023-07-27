import NextImage from "@/components/NextImage";
import { serviceAPI } from "@/services/serviceAPI";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { A11y, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { replaceDistrict, replaceProvince } from "../utils";

const Home = ({ data }: any) => {
  const restaurant = useMemo(
    () =>
      data?.map((item: any) => ({
        value: item?.id + "",
        label: `${item?.name} (${item?.addressDetail}, ${replaceDistrict(
          item?.District?.name
        )}, ${replaceProvince(item?.Province?.name)})`,
      })),
    [data]
  );
  return (
    <>
      <div className="pb-[60px]">
        <div>
          <Swiper
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Navigation, Pagination, A11y]}
            pagination={{ clickable: true }}
            className="swiper-teacher custom-pagingnation"
          >
            <SwiperSlide>
              <div className="w-full pt-[37.25%] relative">
                <div className="absolute inset-0">
                  <figure>
                    <NextImage
                      src={"/images/f2.jpeg"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </figure>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full pt-[37.25%] relative">
                <div className="absolute inset-0">
                  <figure>
                    <NextImage
                      src={"/images/f3.jpeg"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </figure>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full pt-[37.25%] relative">
                <div className="absolute inset-0">
                  <figure>
                    <NextImage
                      src={"/images/f4.jpeg"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </figure>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="mt-6 px-4">
          <h2 className="font-medium text-base">
            Danh sách chuỗi nhà hàng MTFood:
          </h2>
          <div className="pl-4 grid grid-cols-1 gap-4 mt-4">
            {restaurant?.map((item: any) => (
              <p key={item?.value}>- {item?.label}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-colorcs-f6f6f6 shadow-inner">
        <div className="flex justify-center items-center h-full">
          <Link href="/dat-cho">
            <a className="p-3 flex justify-center flex-col items-center">
              <BsFillCheckCircleFill size={20} fill="#d02028" />
              <span>Đặt chỗ</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await serviceAPI.getRestaurant();

    return {
      props: {
        data: res?.data?.data?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};

export default Home;
