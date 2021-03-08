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
import { login, clearLoginError } from "./userSlice";

export default function Login(params) {
  const [formdata, updateFormData] = useFormData({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoginLoading, loginError, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(login(formdata));
  };

  useEffect(() => {
    return () => {
      dispatch(clearLoginError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Container>
      <Box mt={10} maxWidth="md">
        <Box>
          <Heading color="gray.600" mb={10}>
            Welcome Back!
          </Heading>
        </Box>
        <Box>
          <form onSubmit={submitForm}>
            <VStack spacing={4}>
              <FormControl id="username" isRequired isInvalid={!!loginError}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="john"
                  disabled={isLoginLoading}
                  value={formdata.username}
                  onChange={updateFormData}
                  required
                />
                <FormErrorMessage>{loginError}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  disabled={isLoginLoading}
                  value={formdata.password}
                  onChange={updateFormData}
                  required
                />
              </FormControl>

              <Button
                isLoading={isLoginLoading}
                type="submit"
                colorScheme="blue"
                isFullWidth
              >
                Login
              </Button>
            </VStack>
            <Text mt={2} fontSize="sm" align="center">
              Don't have an account? <Link to="/register">register</Link>
            </Text>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
