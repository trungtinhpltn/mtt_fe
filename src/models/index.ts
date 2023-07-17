export interface INavLinkProps {
  id: number;
  name: string;
  link: string;
  externalLink?: boolean;
  loginRequired?: boolean;
  children?: Array<string>;
}

export interface ICreateOrder {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  person: number;
  children: number;
  key?: string;
  restaurantId: number;
}
