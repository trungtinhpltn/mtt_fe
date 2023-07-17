import { toastError } from "./toast";

export const timeDateFormat = (dt: any) => {
  const date = new Date(dt);
  const dateStr =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2);
  return dateStr;
};

export const scrollToEl = (id: string) => {
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export const dateFormat = (dt: any) => {
  if (!dt) return "";
  const date = new Date(dt);
  const dateStr =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  return dateStr;
};

export const isURL = (str: string) => {
  if (!str) return false;
  return str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
};

export const timeFormat = (dt: any) => {
  const date = new Date(dt);
  const dateStr =
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2);
  return dateStr;
};

export const validPhone = (phone: string) => {
  const regex = /(08|03|09|01[2|6|8|9])+([0-9]{7,12})\b/;
  return regex.test(String(phone).toLowerCase());
};

export const validEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const toSlug = (str = "", addString = "-") => {
  str = String(str);
  str = str.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");
  str = str.replace(/([^0-9a-z-\s])/g, "");
  str = str.replace(/(\s+)/g, "-");
  str = str.replace(/^-+/g, "");
  str = str.replace(/-+$/g, "");
  str = str.replace(/-+/g, "-");
  return str;
};

export const slugToId = (slug = "") => {
  if (!slug) return "";
  return [...String(slug).matchAll(/(.+?\-)?(\d+)$/gi)]?.[0]?.[2];
};

export const getFirst = (str: string | string[]): string => {
  if (typeof str === "object") {
    return str?.[0];
  }
  return str;
};

export const onRedirectExternal = (
  e: React.MouseEvent<HTMLElement>,
  link = ""
) => {
  if (link.startsWith("http")) return;
  toastError("Đường dẫn không hợp lệ!");
  e.preventDefault();
};

// export const getMediaFormat = (
//   image: IImageProps,
//   format: "" | "small" | "thumbnail" | "medium" | "large" = ""
// ) => {
//   let url = image?.data?.attributes?.url;
//   if (format && image?.data?.attributes?.formats?.[format]?.url) {
//     url = image?.data?.attributes?.formats?.[format]?.url;
//   }
//   return process.env.NEXT_PUBLIC_API_URL + url;
// };

export const getStrapiMedia = (link = "") => {
  return process.env.NEXT_PUBLIC_API_URL + link;
};

export const validateEmail = (email = "") => {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    email
  );
};

export const editContentHandle = (content = "") => {
  content = content
    ? content.replace(
        /src="\/uploads\//g,
        `src="${process.env.NEXT_PUBLIC_API_URL}/uploads/`
      )
    : "";
  content = content
    ? content.replace(
        /srcset="\/uploads\//g,
        `src="${process.env.NEXT_PUBLIC_API_URL}/uploads/`
      )
    : "";
  return content;
};

export const removeHTMLTags = (text = "") => {
  if (!text) return "";

  const regex = /(<([^>]+)>)/gi;

  return text.replace(regex, "");
};

export const replaceDistrict = (dist = "") =>
  dist.replace("Huyện", "").replace("Quận", "").replace("Thị xã", "");
export const replaceProvince = (pro = "") =>
  pro.replace("Thành phố", "").replace("Tỉnh", "");
