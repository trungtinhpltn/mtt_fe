import Loading from "@/components/Loading";
import { serviceAPI } from "@/services/serviceAPI";
import { toastError, toastSuccess } from "@/utils/toast";
import { schemaCreateOrder } from "@/utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MAX_CHILDREN, MAX_PERSON, TIME_OPEN } from "../../constants";
import { replaceDistrict, replaceProvince } from "../../utils";
type Inputs = {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: { label: string; value: string };
  person: { label: string; value: string };
  children: { label: string; value: string };
  restaurant: { label: string; value: string };
};

const Order = ({ data }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const maxDatePerDate = useMemo(() => {
    let timeGet: any = new Date().toDateString();
    timeGet = new Date(timeGet + " 23:00").getTime();
    return timeGet;
  }, []);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(schemaCreateOrder),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      time: TIME_OPEN[0],
      person: MAX_PERSON[0],
      children: MAX_CHILDREN[0],
      restaurant: restaurant?.[0],
    },
  });

  const onSubmit = (data: Inputs) => {
    const time = data.time.value.replace("h", "");
    const date = new Date(data.date).toDateString();
    const dateTimeOrder = new Date(date + " " + time).getTime();
    const now = new Date().getTime();
    if (dateTimeOrder < now) {
      toastError("Thời gian không hợp lệ");
      return;
    }
    if (loading) return;
    setLoading(true);
    serviceAPI
      .createOrder({
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        date: data?.date?.toDateString() + "",
        time: data?.time?.value,
        person: +data?.person?.value,
        children: +data?.children?.value,
        restaurantId: +data?.restaurant?.value,
      })
      .then((res) => {
        toastSuccess("Thành công");
        router.push(`/${res?.data?.data?.key}`);
      })
      .catch((errors) => {
        toastError(errors.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (new Date().getTime() > maxDatePerDate) {
      setValue("date", new Date(new Date().setDate(new Date().getDate() + 1)));
    }
  }, [maxDatePerDate, setValue]);

  return (
    <>
      {loading && <Loading />}
      <div className="grid grid-cols-1 gap-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="bg-colorcs-f6f6f6 p-2 uppercase text-center text-lg">
              <span>Thông tin đặt chỗ</span>
            </div>
            <ul className="">
              <li className="py-3 px-1 text-base border-b flex flex-row">
                <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                  Chọn nhà hàng*
                </span>
                <div className="w-full">
                  <Controller
                    control={control}
                    name="restaurant"
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          id="p-sl"
                          options={restaurant}
                          placeholder="Chọn nhà hàng"
                        />
                      );
                    }}
                  />
                </div>
              </li>
              <li className="py-3 px-1 text-base border-b flex flex-row">
                <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                  Ngày đến*
                </span>
                <div className="w-full">
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { value, ...fieldProps } }) => {
                      return (
                        <DatePicker
                          {...fieldProps}
                          placeholderText="Ngày đến"
                          selected={value}
                          minDate={
                            new Date().getTime() > maxDatePerDate
                              ? new Date(
                                  new Date().setDate(new Date().getDate() + 1)
                                )
                              : new Date()
                          }
                          maxDate={
                            new Date(
                              new Date().setDate(new Date().getDate() + 7)
                            )
                          }
                          dateFormat={"dd-MM-yyyy"}
                          className="outline-none w-full border p-2 rounded"
                        />
                      );
                    }}
                  />
                </div>
              </li>
              <li className="py-3 px-1 text-base border-b flex flex-row items-center">
                <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                  Giờ đến*
                </span>
                <div className="w-full max-w-[200px]">
                  <Controller
                    control={control}
                    name="time"
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          id="time-sl"
                          options={TIME_OPEN}
                          placeholder="Giờ đến"
                        />
                      );
                    }}
                  />
                </div>
              </li>
              <li className="py-3 px-1 text-base border-b flex flex-row items-center">
                <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                  Người lớn*
                </span>
                <div className="w-full max-w-[200px]">
                  <Controller
                    control={control}
                    name="person"
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          id="p-sl"
                          options={MAX_PERSON}
                          placeholder="Người lớn"
                        />
                      );
                    }}
                  />
                </div>
              </li>
              <li className="py-3 px-1 text-base border-b flex flex-row items-center">
                <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                  Trẻ em*
                </span>
                <div className="w-full max-w-[200px]">
                  <Controller
                    control={control}
                    name="children"
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          id="c-sl"
                          options={MAX_CHILDREN}
                          placeholder="Trẻ em"
                        />
                      );
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className="bg-colorcs-f6f6f6 p-2 uppercase text-center text-lg">
              <span>Thông tin liên hệ</span>
            </div>
            <ul className="">
              <li className="py-3 px-1 text-base border-b">
                <div className="flex flex-row c">
                  <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                    Số điện thoại*
                  </span>
                  <div className="w-full max-w-[300px]">
                    <input
                      placeholder="Số điện thoại"
                      {...register("phone")}
                      className="h-10 w-full px-2 outline-none border rounded"
                    />
                    <p className="mt-1 text-[13px] text-colorcs-FF5656">
                      {errors?.phone?.message}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 px-1 text-base border-b">
                <div className="flex flex-row items-start">
                  <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                    Tên liên hệ*
                  </span>
                  <div className="w-full max-w-[300px]">
                    <input
                      placeholder="Tên liên hệ"
                      {...register("name")}
                      className="h-10 w-full px-2 outline-none border rounded"
                    />
                    <p className="mt-1 text-[13px] text-colorcs-FF5656">
                      {errors?.name?.message}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 px-1 text-base border-b">
                <div className="flex flex-row items-start">
                  <span className="text-colorcs-d02028 min-w-[120px] flex-shrink-0">
                    Email*
                  </span>
                  <div className="w-full max-w-[300px]">
                    <input
                      placeholder="Email"
                      {...register("email")}
                      className="h-10 w-full px-2 outline-none border rounded"
                    />
                    <p className="mt-1 text-[13px] text-colorcs-FF5656">
                      {errors?.email?.message}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-center mt-6">
            <input
              type="submit"
              className="bg-colorcs-d02028 text-white px-7 py-1 rounded-full overflow-hidden font-semibold cursor-pointer"
              value={"Đặt chỗ ngay"}
            />
          </div>
        </form>
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

export default Order;
