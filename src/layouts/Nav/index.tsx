import { navLink } from "@/constants/index";
import useToggleSidebar from "hooks/useToggleSidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Nav() {
  const { closeSidebar, toggleSidebar } = useToggleSidebar();
  const router = useRouter();

  useEffect(() => {
    const cb = () => {
      if (window.innerWidth > 1140) {
        closeSidebar();
      }
    };
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, [closeSidebar]);

  return (
    <nav className="bg-colorcs-d02028 h-[60px] z-[2] absolute w-full left-0 top-0">
      <div className="relative px-3 md:px-2 h-full mx-auto flex flex-wrap justify-between items-center">
        <h1 className="ms-logo z-20">
          <Link href="/">
            <a title="FTech">
              <span className="select-none relative text-white font-bold text-3xl">
                MTFood
              </span>
            </a>
          </Link>
        </h1>
        <ul className="sidebar font-medium z-30 opacity-0 invisible lg:visible lg:opacity-100 bg-gra479ef1 lg:bg-transparent fixed lg:relative top-[60px] lg:top-0 left-0 flex flex-wrap text-base xl:text-lg h-auto lg:h-full lg:w-auto w-full bg-colorcs-182537 lg:bg-none">
          {navLink?.map((item) => (
            <li
              className="flex flex-wrap items-center w-full relative px-0 lg:px-1 lg:w-auto border-b border-colorcs-6FACE8 lg:border-0 last:border-0"
              key={item?.id}
            >
              <Link
                href={
                  item.otherRedirect === router.pathname
                    ? item.otherRedirectTarget
                    : item?.link
                }
              >
                <a
                  className={`w-full rounded-none lg:rounded-lg text-white px-4 py-4 lg:py-2 flex flex-wrap items-center hover:bg-white hover:text-colorcs-1080EC duration-200 ${
                    item?.link === router?.pathname ||
                    item?.baseUrl === router?.pathname ||
                    item?.childrens?.includes(router?.pathname)
                      ? `active`
                      : ``
                  }`}
                  onClick={toggleSidebar}
                >
                  {item?.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {/* <button className="absolute top-[50%] -translate-y-1/2 right-0 z-10 lg:hidden block outline-none focus:outline-none">
          <Hamberger />
        </button> */}
      </div>
    </nav>
  );
}
