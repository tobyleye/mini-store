import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  SimpleGrid,
  Image,
  Button,
  useToast,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "./productSlice";
import store from "../../store.json";
import Settings from "./Settings";
import OrderSummary from "./OrderSummary";
import { Redirect } from "react-router";

const Product = ({ onAddToCart, ...product }) => {
  return (
    <Box>
      <Box h={"150px"} bg="gray.500" mb={2}>
        <Image objectFit="cover" src={product.imageUrl} w="full" h="full" />
      </Box>
      <Heading size="sm" color="gray.600" fontWeight={400}>
        {product.name}
      </Heading>
      <Text fontWeight={700} fontSize="xl" color="gray.800">
        ₦{product.price.toLocaleString()}
      </Text>
      <Button
        isFullWidth
        colorScheme="green"
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </Button>
    </Box>
  );
};

const ProductFilter = ({ category }) => {
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
        duration: 9000,
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
        duration: 9000,
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

  return (
    <SimpleGrid spacing={5} columns={[1, 2, 3, 3]}>
      {filteredProducts.map((product) => (
        <Product key={product.id} {...product} onAddToCart={_addToCart} />
      ))}
    </SimpleGrid>
  );
};

export default function ProductList() {
  const { categories, cart } = useSelector((state) => state.product);
  const { isAuthentiated } = useSelector((state) => state.user);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const {
    isOpen: isSummaryOpen,
    onClose: onCloseSummary,
    onOpen: onSummaryOpen,
  } = useDisclosure();

  useEffect(() => {
    // watch categories and update cart if a category is disabled
    dispatch(updateCart());
  }, [categories]);

  if (!isAuthentiated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container maxW="960px">
      {/* settings modal */}
      <Settings onClose={onClose} isOpen={isOpen} />
      {/*  order summary */}
      <OrderSummary isOpen={isSummaryOpen} onClose={onCloseSummary} />

      <Box
        as="header"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        py={2}
      >
        <Button mr={2} onClick={onOpen}>
          Settings
        </Button>
        <Button onClick={onSummaryOpen}>Cart({cart.length})</Button>
      </Box>
      <Tabs>
        <Grid mt={4} gridTemplateColumns={[null, null, "auto 1fr"]}>
          {/* header --- greetings */}
          <Box mb={6} gridColumn={[null, null, 2]}>
            <Heading size="xl" mb={1} color="gray.800">
              Hi Johndoe 👋
            </Heading>
            <Text color="gray.500" fontSize="xl">
              Find your daily products
            </Text>
          </Box>

          {/*  tab list  */}
          <Box flexShrink="0" gridRow={[null, null, 2]} mb={4}>
            <TabList
              border={[null, null, "none"]}
              mr={6}
              flexDirection={[null, null, "column"]}
            >
              {categories.map((cat, idx) => (
                <Tab
                  key={idx}
                  justifyContent="flex-start"
                  textTransform="capitalize"
                  isDisabled={!cat.active}
                  whiteSpace="nowrap"
                >
                  {cat.name}
                </Tab>
              ))}
            </TabList>
          </Box>

          {/*  tab panels  */}
          <Box gridRow={[null, null, 2]} gridColumn={[null, null, 2]}>
            <TabPanels>
              {categories.map((category, idx) => (
                <TabPanel key={idx}>
                  <ProductFilter category={category} />
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
        </Grid>
      </Tabs>
    </Container>
  );
}
