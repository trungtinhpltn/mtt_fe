import { serviceAPI } from "@/services/serviceAPI";
import { toastError, toastSuccess } from "@/utils/toast";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Edit from "@/components/Edit";
import { dateFormat, replaceDistrict, replaceProvince } from "../utils";
import Link from "next/link";

const ViewOrder = ({ data, restaurants }: any) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleCancelRequest = () => {
    serviceAPI
      .deleteOrder(data?.id, data?.key)
      .then((res) => {
        toastSuccess("Hủy yêu cầu thành công");
        router.push("/");
      })
      .catch((errors) => {
        toastError(errors.response?.data?.message);
      })
      .finally(() => {
        setShowConfirm(false);
      });
  };

  return (
    <>
      {edit ? (
        <Edit
          data={data}
          restaurants={restaurants}
          back={() => setEdit(false)}
        />
      ) : (
        <div>
          {data ? (
            <>
              <div
                className={`fixed inset-0 z-[100] opensan-font transition-all duration-300 ${
                  showConfirm ? `visible opacity-100` : `invisible opacity-0`
                }`}
              >
                <div className="absolute inset-0 bg-black opacity-70" />
                <div className="w-full max-w-[375px] rounded-lg p-8 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white">
                  <h4 className="text-center font-bold text-xl">Xác nhận</h4>
                  <p className="mt-7 text-center font-medium">
                    Bạn có chắc muốn hủy yêu cầu này?
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-10">
                    <button
                      className={`border rounded-lg px-7 py-2 oswald-font text-colorcs-5E73FF flex justify-center items-center w-full`}
                      onClick={() => setShowConfirm(false)}
                    >
                      <span className="font-medium text-lg">Hủy</span>
                    </button>
                    <button
                      className={`border rounded-lg px-7 py-2 oswald-font  flex justify-center items-center w-full`}
                      onClick={handleCancelRequest}
                    >
                      <span className="font-medium text-lg">Xác nhận</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-w-[400px] mx-auto opensan-font mt-10">
                <div className="flex justify-center mb-5">
                  <BsFillCheckCircleFill
                    color="#4AD150"
                    className={`w-20 h-20 rounded-full `}
                  />
                </div>
                <h3 className="text-center font-bold text-xl">
                  {data?.confirm
                    ? `Yêu cầu đã được xác nhận.`
                    : `Cảm ơn bạn đã lựa chọn MTFood. Yêu cầu đặt bàn của bạn đã được
                  ghi nhận. Vui lòng đợi xác nhận từ chúng tôi.`}
                </h3>
                <ul className="px-10 text-center mt-8 font-medium">
                  <li className="border-b last:border-none py-5 first:pt-0">
                    <p>{data?.name}</p>
                    <p className="mt-3">{data?.phone}</p>
                    <p className="mt-3">{data?.email}</p>
                  </li>
                  <li className="border-b last:border-none py-5 first:pt-0">
                    <p className="mb-3 last:mb-0">
                      Nhà hàng: {`${data?.Restaurant?.name}`}
                      <br />
                      {`(${data?.Restaurant?.addressDetail}, ${replaceDistrict(
                        data?.Restaurant?.District?.name
                      )}, ${replaceProvince(
                        data?.Restaurant?.Province?.name
                      )})`}
                    </p>
                    {data?.tableId && (
                      <p className="mb-3 last:mb-0">
                        Bàn: {`${data?.TableFood?.name}`}
                      </p>
                    )}
                    <p className="mb-3 last:mb-0">
                      Thời gian: {data?.time} {dateFormat(data?.date)}
                    </p>
                    <p className="mb-3 last:mb-0">Người lớn: {data?.person}</p>
                    <p className="mb-3 last:mb-0">Trẻ em: {data?.children} </p>
                  </li>
                </ul>
                <div className="mx-auto max-w-[300px] mt-5">
                  {!data?.confirm ? (
                    <div className="grid grid-cols-1 gap-6">
                      <button
                        className="bg-colorcs-ffc107 text-white py-2 px-6 rounded-full font-semibold"
                        onClick={() => setEdit(true)}
                      >
                        Sửa yêu cầu
                      </button>
                      <button
                        className="bg-colorcs-d02028 text-white py-2 px-6 rounded-full font-semibold"
                        onClick={() => setShowConfirm(true)}
                      >
                        Hủy yêu cầu
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Link href="/">
                        <a className="bg-neutral-400 text-white px-7 py-1 rounded-full overflow-hidden font-semibold cursor-pointer min-w-[180px] text-center inline-block">
                          Quay lại
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center font-bold text-2xl mt-20">
              Không có nội dung
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { key } = ctx.query;
    const res = await serviceAPI.getOrderBykey(key + "");
    const restaurants = await serviceAPI.getRestaurant();
    return {
      props: {
        data: res?.data?.data,
        restaurants: restaurants?.data?.data?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        restaurants: [],
      },
    };
  }
};

export default ViewOrder;
