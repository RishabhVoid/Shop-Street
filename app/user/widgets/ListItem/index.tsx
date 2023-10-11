import AddToCartToButton from "@/app/search/widgets/AddToCartButton";
import AddToWishlist from "@/app/search/widgets/AddToWishlist";
import ViewerProductView from "@/components/ViewerProductView";
import { ProductType } from "@/types";

interface Props {
  product: string;
  cartProd?: boolean;
}

const ListItem = ({ product: Product, cartProd = false }: Props) => {
  const product: ProductType = JSON.parse(Product);

  return (
    <div className="flex flex-col">
      <div className="relative w-[170px] h-[300px] mb-2">
        <ViewerProductView product={product} />
      </div>
      {cartProd ? (
        <AddToCartToButton
          productId={product._id}
          styles="text-xs scale-[0.9]"
        />
      ) : (
        <>
          <AddToWishlist productId={product._id} styles="text-xs scale-[0.9]" />
          <AddToCartToButton productId={product._id} styles="text-xs scale-[0.9]" />
        </>
      )}
    </div>
  );
};

export default ListItem;
