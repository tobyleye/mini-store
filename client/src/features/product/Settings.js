import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Switch,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "./productSlice";

export default function Settings({ isOpen, onClose }) {
  const { categories } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const toast = useToast();

  const canDisable = () => {
    const disabledCategories = categories.filter((cat) => cat.active === false);
    if (categories.length - disabledCategories.length === 1) {
      return false;
    }
    return true;
  };

  const onChange = ({ id, disable }) => {
    // if it's a disable action, check if it can be disabled
    if (disable && !canDisable()) {
      toast({
        description: "You cannot deselect all product categories",
        status: "error",
      });
      return;
    }
    dispatch(toggleCategory({ id, disable }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categories settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {categories.map((category) => (
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor={category.name} mb="0">
                    {category.name}
                  </FormLabel>
                  <Switch
                    id={category.name}
                    isChecked={category.active}
                    onChange={() =>
                      onChange({
                        id: category.id,
                        disable: category.active ? true : false,
                      })
                    }
                  />
                </FormControl>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
