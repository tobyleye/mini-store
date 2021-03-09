import { SimpleGrid, useToast } from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store.json";
import { addToCart, removeProductFromCart } from "./productSlice";

export default function CategoryProducts({ category }) {
  const toast = useToast();
  const { id: categoryId } = category;
  const filteredProducts = store.products.filter(
    (p) => p.categoryId === categoryId
  );

  const { cart } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // check if a product of this category has been added to cart
  const categoryIsInCart = () => {
    for (let product of cart) {
      if (product.categoryId === categoryId) return true;
    }
    return false;
  };

  // add a product item to cart;
  const _addToCart = (product) => {
    // check if category is disabled
    if (!category.active) {
      toast({
        title: "Error",
        description: `${category.name} category is disabled. Enable category to purchase product in this category`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // check if a product of this category is already in cart
    if (categoryIsInCart()) {
      toast({
        title: "Error",
        description: "you can purchase only ONE product per active category",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(addToCart(product));
    toast({
      status: "success",
      description: "Added to cart",
    });
  };

  // remove from cart
  const _removeFromCart = (product) => {
    dispatch(removeProductFromCart(product.id));
  };

  const isInCart = (productId) => {
    return !!cart.find(({ id }) => id === productId);
  };

  return (
    <SimpleGrid spacing={5} columns={[1, 2, 3, 3]}>
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          {...product}
          onAddToCart={_addToCart}
          onRemoveFromCart={_removeFromCart}
          isInCart={isInCart(product.id)}
        />
      ))}
    </SimpleGrid>
  );
}
