import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Image,
  Box,
  Heading,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DeleteIcon } from "@chakra-ui/icons";
import { removeProductFromCart } from "./productSlice";

export default function OrderSummary({ isOpen, onClose }) {
  const history = useHistory();
  const { cart } = useSelector((state) => state.product);

  const total = cart.reduce((total, product) => total + product.price, 0);
  const dispatch = useDispatch();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Order Summary</DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <Text color="gray.400" textAlign="center" mt={10}>
                Your cart is empty.
              </Text>
            ) : (
              <VStack spacing={8} mt={8} justifyContent="flex-start">
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
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text color="gray.500">
                          ₦{product.price.toLocaleString()}
                        </Text>

                        <IconButton
                          size="xs"
                          variant="outline"
                          colorScheme="red"
                          aria-label="Delete product"
                          onClick={() =>
                            dispatch(removeProductFromCart(product.id))
                          }
                          icon={<DeleteIcon fontSize="sm" />}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Box w="full">
              <Box mb={4}>
                <Heading size="sm" mb={1}>
                  Order info
                </Heading>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="gray.500" fontSize="sm">
                    Total
                  </Text>
                  <Text fontWeight={600}>₦{total.toLocaleString()}</Text>
                </Box>
              </Box>
              <Button
                isFullWidth
                variant="outline"
                mr={3}
                onClick={() => history.push("/checkout")}
              >
                Submit
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
