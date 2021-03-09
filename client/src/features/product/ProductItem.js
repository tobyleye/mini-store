import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";

export default function ProductItem({
  onAddToCart,
  isInCart,
  onRemoveFromCart,
  ...product
}) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={3}
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Box h={"150px"} bg="gray.500" mb={2} flexShrink={0}>
        <Image objectFit="cover" src={product.imageUrl} w="full" h="full" />
      </Box>
      <Box p={2} flex={1} display="flex" flexDirection="column">
        <Heading size="sm" color="gray.600" fontWeight={400}>
          {product.name}
        </Heading>
        <Text fontWeight={700} fontSize="xl" color="gray.800">
          ₦{product.price.toLocaleString()}
        </Text>
        <Box mt="auto ">
          {isInCart ? (
            <Button
              colorScheme="red"
              isFullWidth
              onClick={() => onRemoveFromCart(product)}
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              isFullWidth
              colorScheme="yellow"
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
