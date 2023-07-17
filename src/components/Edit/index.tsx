import { serviceAPI } from "@/services/serviceAPI";
import { toastError, toastSuccess } from "@/utils/toast";
import { schemaCreateOrder } from "@/utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
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

const Edit = ({ data, restaurants, back }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const restaurant = useMemo(
    () =>
      restaurants?.map((item: any) => ({
        value: item?.id + "",
        label: `${item?.name} (${item?.addressDetail}, ${replaceDistrict(
          item?.District?.name
        )}, ${replaceProvince(item?.Province?.name)})`,
      })),
    [restaurants]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(schemaCreateOrder),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      date: new Date(data?.date),
      time:
        TIME_OPEN?.find((item) => item?.value === data?.time) || TIME_OPEN[0],
      person:
        MAX_PERSON?.find((item) => item?.value === data?.person + "") ||
        MAX_PERSON[0],
      children:
        MAX_CHILDREN?.find((item) => item?.value === data?.children + "") ||
        MAX_CHILDREN[0],
      restaurant: restaurant?.find(
        (item: any) => item?.value === data?.restaurantId + ""
      ),
    },
  });

  const onSubmit = (input: Inputs) => {
    if (
      input.time.value !== data?.time ||
      input?.date?.toDateString() !== data?.date
    ) {
      const time = input.time.value.replace("h", "");
      const date = new Date(input.date).toDateString();
      const dateTimeOrder = new Date(date + " " + time).getTime();
      const now = new Date().getTime();
      if (dateTimeOrder < now) {
        toastError("Thời gian không hợp lệ");
        return;
      }
    }
    if (loading) return;
    setLoading(true);
    serviceAPI
      .updateOrder(data?.id, data?.key, {
        name: input?.name,
        phone: input?.phone,
        email: input?.email,
        date: input?.date?.toDateString() + "",
        time: input?.time?.value,
        person: +input?.person?.value,
        children: +input?.children?.value,
        restaurantId: +input?.restaurant?.value,
      })
      .then((res) => {
        toastSuccess("Cập nhật thành công");
        router.reload();
      })
      .catch((errors) => {
        toastError(errors.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
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
                        minDate={new Date()}
                        maxDate={
                          new Date(new Date().setDate(new Date().getDate() + 7))
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
                    disabled
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
                    disabled
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
                    disabled
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
            className="bg-colorcs-d02028 text-white px-7 py-1 rounded-full overflow-hidden font-semibold cursor-pointer min-w-[180px]"
            value={"Sửa"}
          />
        </div>
      </form>
      <div className="flex justify-center">
        <button
          className="bg-neutral-400 text-white px-7 py-1 rounded-full overflow-hidden font-semibold cursor-pointer min-w-[180px]"
          onClick={() => back()}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default Edit;
