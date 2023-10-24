"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Categories } from "@/constants";
import Loading from "./widgets/Loading";
import ProductImageHandler from "./widgets/ProductImageHandler";
import InputSection from "./widgets/InputSection";
import useHandlePostItem from "./hooks/useHandlePostItem";

const AddProduct = () => {
  const {
    isDis,
    pictureViewRef,
    currentImage,
    files,
    setFiles,
    goToNextImage,
    goToPrevImage,
    popUp,
    handleSubmit,
    logsRef,
    logs,
    titleRef,
    priceRef,
    categories,
    inventorySizeRef,
    deliveryDistanceRef,
    deliveryTimeRef,
    handleCategoryAdd,
    descRef,
    handleReset,
  } = useHandlePostItem();

  return (
    <div
      className={
        "h-full relative flex flex-col items-center max_contain overflow-x-hidden md:overflow-y-hidden overflow-y-auto md:flex-row md:w-full custom_scroll"
      }
    >
      {isDis && <Loading />}
      <div ref={pictureViewRef} />
      <ProductImageHandler
        currentImage={currentImage}
        files={files}
        setFiles={setFiles}
        goToNextImage={goToNextImage}
        goToPrevImage={goToPrevImage}
        popUp={popUp}
      />
      <form
        className="w-[95%] flex flex-col p-2 md:p-0 rounded-t-[5px] bg-white z-20 -mt-4 flex-1 md:flex-none md:w-[20rem] md:h-full"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col md:overflow-y-auto md:h-full md:py-4 custom_scroll">
          <div ref={logsRef} className="mb-4" />
          <div className="bg-red-400 rounded-[5px] px-2 text-white">
            {logs.map((log, index) => (
              <h2 key={index}>{log}</h2>
            ))}
          </div>
          <InputSection
            inpRef={titleRef}
            label="Product name"
            placeholder="Put name here..."
          />
          <InputSection
            inpRef={priceRef}
            label="Price"
            specialString="$"
            typeNo
            placeholder="Product's price"
          />
          <div className="w-full flex flex-col h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Choose categories
            </label>
            <div className="h-auto flex flex-wrap items-center min-h-[2rem]">
              {categories.map((category, index) => (
                <h2
                  key={index}
                  className="capitalize m-1 bg-blue-600 p-1 rounded-[5px] text-white"
                >
                  #{category}
                </h2>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-primary align-left bg-[--primary-accent] text-white py-2 rounded-[5px]">
                Choose category
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white h-[20rem] rounded-[5px] overflow-y-scroll custom_scroll">
                {Categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className={`capitalize cursor-pointer ${
                      categories.includes(category.toLowerCase()) &&
                      "bg-blue-800 text-white"
                    }`}
                    onClick={() => handleCategoryAdd(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <InputSection
            inpRef={inventorySizeRef}
            label="Inventory size"
            typeNo
            placeholder="Amount of items available..."
          />
          <InputSection
            inpRef={deliveryDistanceRef}
            label="Delivery distance"
            typeNo
            specialString="Km"
            placeholder="52..."
          />
          <InputSection
            inpRef={deliveryTimeRef}
            label="Delivery time"
            typeNo
            specialString="Days"
            placeholder="5..."
          />
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Description
            </label>
            <textarea
              id="title"
              ref={descRef}
              className="shadow-sm w-full mt-2 h-[10rem] resize-none shadow-slate-600 text-[1rem] p-2 rounded-[5px] outline-[--primary-accent]"
              placeholder="Best glossy chair..."
            />
          </div>
          <div className="flex flex-col">
            <button
              className="bg-blue-600 font-primary rounded-[5px] py-2 text-white"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-red-500 mt-4 font-primary rounded-[5px] py-2 text-white"
              onClick={() => handleReset()}
              type="button"
            >
              Reset form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
