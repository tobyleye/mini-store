import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";

export default function ProductItem({ onAddToCart, ...product }) {
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
}
