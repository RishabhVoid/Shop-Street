import { IconType } from "react-icons";

interface Props {
  img: string;
  imgColor: string;
  title: string;
  specialTitle?: string;
  down?: boolean;
}

const Card = ({ img, imgColor, title, specialTitle, down }: Props) => {
  return (
    <div className="flex-1 min-h-[150px] bg-slate-200 flex rounded-[10px] min-w-[300px]">
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          style={{ background: imgColor }}
          className="rounded-[20px] w-[80px] h-[80px] items-center justify-center flex"
        >
          <img
            src={img}
            alt="img"
            className="w-[35px] h-[35px] object-contain"
          />
        </div>
      </div>
      <div className="flex-[2] flex p-4 flex-col justify-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h1 className="text-xl">{specialTitle}</h1>
      </div>
    </div>
  );
};

export default Card;
