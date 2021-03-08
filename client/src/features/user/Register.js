import {
  FormLabel,
  Input,
  Box,
  Heading,
  FormControl,
  VStack,
  Button,
  Container,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import useFormData from "../../hooks/useFormdata";
import { register, clearSignupError } from "./userSlice";

export default function Register() {
  const [formdata, updateFormData] = useFormData({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isSignupLoading, signupError, isAuthenticated } = useSelector(
    (state) => state.user
  );

  console.log({ isSignupLoading, signupError });

  useEffect(() => {
    return () => {
      dispatch(clearSignupError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(register(formdata));
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Container>
      <Box mt={10} maxWidth="md">
        <Box>
          <Heading color="gray.600" mb={10}>
            Register
          </Heading>
        </Box>
        <Box>
          <form onSubmit={submitForm}>
            <VStack spacing={4}>
              <FormControl id="username" isRequired isInvalid={signupError}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formdata.username}
                  onChange={updateFormData}
                  disabled={isSignupLoading}
                  required
                />
                <FormErrorMessage>{signupError}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value={formdata.password}
                  onChange={updateFormData}
                  type="password"
                  disabled={isSignupLoading}
                  required
                />
              </FormControl>

              <Button
                isLoading={isSignupLoading}
                type="submit"
                colorScheme="blue"
                isFullWidth
              >
                Register
              </Button>
              <Text mt={2} fontSize="sm" align="center">
                Aready a member? <Link to="/login">Login</Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
