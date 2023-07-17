import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Home = () => {
  // test
  return (
    <>
      <div className="pb-[60px]">1</div>
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

export default Home;
