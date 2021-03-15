import {
  Button,
  Text,
  Image,
  Box,
  Heading,
  VStack,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Checkout() {
  const { cart } = useSelector((state) => state.product);
  const history = useHistory();

  return (
    <Container>
      <VStack alignItems="flex-start" spacing={8} mt={8} mb={2}>
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          textAlign="center"
          mb={4}
          mt={10}
          px={16}
        >
          <IconButton
            position="absolute"
            top="0px"
            left="0px"
            icon={<ArrowBackIcon />}
            onClick={() => history.push("/")}
          />
          <Heading>Checkout 🎉🎉🎉 </Heading>
        </Box>
        {cart.map((product) => (
          <Box key={product.id} display="flex">
            <Image
              src={product.imageUrl}
              h={"60px"}
              w={"60px"}
              objectFit="cover"
              mr={2}
            />
            <Box>
              <Heading size="sm" mb={2} color="gray.800">
                {product.name}
              </Heading>

              <Text color="gray.500">₦{product.price.toLocaleString()}</Text>
            </Box>
          </Box>
        ))}
      </VStack>
      <Box textAlign="center">
        <Button>Print</Button>
      </Box>
    </Container>
  );
}
