import Image, { ImageProps } from "next/image";

const NextImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      alt="image"
      quality={props.quality || 100}
      className={`leading-[0px] ${props.className}`}
    />
  );
};

export default NextImage;
