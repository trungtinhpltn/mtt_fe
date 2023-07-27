export const navLink = [
  {
    id: 1,
    name: "Trang chủ",
    elId: "home",
    link: "/",
  },
  {
    id: 2,
    name: "Về chúng tôi",
    elId: "aboutus",
    link: "/gioi-thieu",
  },
  {
    id: 3,
    name: "Sản phẩm",
    elId: "product",
    link: "/san-pham",
    baseUrl: "/san-pham/[slug]",
  },
  {
    id: 4,
    name: "Tuyển dụng",
    elId: "recruitment",
    link: "/tuyen-dung",
    baseUrl: "/tuyen-dung/[slug]",
    childrens: ["/danh-sach-tuyen-dung"],
    otherRedirect: "/tuyen-dung/[slug]",
    otherRedirectTarget: "/danh-sach-tuyen-dung",
  },
  {
    id: 5,
    name: "Tin tức",
    elId: "news",
    link: "/tin-tuc",
    baseUrl: "/tin-tuc/[slug]",
  },
  {
    id: 6,
    name: "Liên hệ",
    elId: "contact",
    link: "/lien-he",
  },
];

export const TIME_OPEN = [
  {
    label: "10h:00",
    value: "10h:00",
  },
  {
    label: "10h:30",
    value: "10h:30",
  },
  {
    label: "11h:00",
    value: "11h:00",
  },

  {
    label: "11h:30",
    value: "11h:30",
  },

  {
    label: "12h:00",
    value: "12h:00",
  },
  {
    label: "12h:30",
    value: "12h:30",
  },
  {
    label: "13h:00",
    value: "13h:00",
  },
  {
    label: "13h:30",
    value: "13h:30",
  },
  {
    label: "14h:00",
    value: "14h:00",
  },
  {
    label: "14h:30",
    value: "14h:30",
  },
  {
    label: "15h:00",
    value: "15h:00",
  },
  {
    label: "15h:30",
    value: "15h:30",
  },
  {
    label: "16h:00",
    value: "16h:00",
  },
  {
    label: "16h:30",
    value: "16h:30",
  },
  {
    label: "17h:00",
    value: "17h:00",
  },
  {
    label: "17h:30",
    value: "17h:30",
  },
  {
    label: "18h:00",
    value: "18h:00",
  },
  {
    label: "18h:30",
    value: "18h:30",
  },
  {
    label: "19h:00",
    value: "19h:00",
  },
  {
    label: "19h:30",
    value: "19h:30",
  },
  {
    label: "20h:00",
    value: "20h:00",
  },
  {
    label: "20h:30",
    value: "20h:30",
  },
  {
    label: "21h:00",
    value: "21h:00",
  },
  {
    label: "21h:30",
    value: "21h:30",
  },
  {
    label: "22h:00",
    value: "22h:00",
  },
];

export const MAX_PERSON = Array(20)
  .fill(1)
  .map((item, index) => ({ label: index + 1 + "", value: index + 1 + "" }));

export const MAX_CHILDREN = Array(11)
  .fill(1)
  .map((item, index) => ({ label: index  + "", value: index + "" }));
