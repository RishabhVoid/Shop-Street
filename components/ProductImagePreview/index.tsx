"use client";

import useDownloadUrls from "@/hooks/useDownloadUrls";
import Image from "next/image";
import { useState } from "react";

interface Props {
  productId: string;
}

const ImagePreviews = ["main", "left", "right", "top"];
const AltImage = "/images/no_product_uploads.png";

const ProductImagePreview = ({ productId }: Props) => {
  const [frontPreview, setFrontPreview] = useState(0);

  const imagePaths = ImagePreviews.map((preview) => {
    return `${productId}-${preview}`;
  });

  const imageUrls = useDownloadUrls(imagePaths);

  return (
    <div className="md:absolute top-0 left-0 md:w-full w-auto h-full flex flex-col mx-auto">
      <div className="flex-1 flex items-center justify-center">
        {ImagePreviews.map((preview, index) => (
          <div
            className={`absolute max-w-[35rem] w-[100%] md:w-[60%] h-[60%] md:min-w-[18rem] bg-white ${
              frontPreview === index && "z-50"
            }`}
            key={preview}
          >
            <Image
              priority
              fill
              sizes="35rem, 35rem"
              src={imageUrls[`${productId}-${preview}`] || AltImage}
              alt="Product image"
              className="object-contain object-center"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center md:h-[20%] h-[10%] justify-center gap-4">
        {ImagePreviews.map((preview, index) => {
          const isActive = Boolean(index === frontPreview);
          return (
            <div
              className={`relative w-[50px] h-[50px] rounded-[5px] cursor-pointer border-2 ${
                isActive ? "border-accent" : "border-slate-500"
              }`}
              key={preview}
              onClick={() => setFrontPreview(index)}
            >
              <Image
                priority
                fill
                sizes="50px, 50px"
                alt="Product images"
                src={imageUrls[`${productId}-${preview}`] || AltImage}
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImagePreview;
