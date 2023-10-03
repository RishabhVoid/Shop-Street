import useDownloadUrls from "@/hooks/useDownloadUrls";
import { ProductType } from "@/types";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { useState } from "react";

interface Props {
  product: ProductType;
}

const imageViews = ["main", "left", "right", "top"];

const Product = ({ product }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imagesList = imageViews.map((view) => {
    return `${product._id}-${view}`;
  });
  const imageUrls = useDownloadUrls(imagesList);

  const nextImage = () => {
    if (currentImage === 3) {
      setCurrentImage(0);
      return;
    }
    setCurrentImage((imageNo) => imageNo + 1);
  };

  const prevImage = () => {
    if (currentImage === 0) {
      setCurrentImage(3);
      return;
    }
    setCurrentImage((imageNo) => imageNo - 1);
  };

  return (
    <div className="w-[320px] bg-slate-200 h-[25rem] max-h-max rounded-[5px]">
      <div className="h-[70%] rounded-t-[5px] border border-red-950 relative overflow-hidden">
        <div
          className="h-full w-[50px] flex items-center justify-center absolute left-0"
          onClick={nextImage}
        >
          <button className="bg-accent w-[35px] h-[35px] flex items-center justify-center rounded-full outline-none">
            <AiFillCaretLeft style={{ color: "white" }} />
          </button>
        </div>
        <div
          className="h-full w-[50px] flex items-center justify-center absolute right-0"
          onClick={prevImage}
        >
          <button className="bg-accent w-[35px] h-[35px] flex items-center justify-center rounded-full outline-none">
            <AiFillCaretRight style={{ color: "white" }} />
          </button>
        </div>
        <img
          src={imageUrls[`${product._id}-${imageViews[currentImage]}`]}
          alt="Product image"
          className="object-contain w-full h-full object-center"
        />
      </div>
    </div>
  );
};

export default Product;
