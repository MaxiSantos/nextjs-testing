'use client'
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { LoadingSpinner } from "@components/_common/LoadingSpinner";
import { SignInError } from "@components/auth/SignInError";
import { useSessionStatus } from "@src/lib/features/users/useSessionStatus";
import { useRouter, useSearchParams } from "next/navigation";
import { Field } from "@/src/components/ui/field";

interface FormField {
  display: string;
  name: string;
  default: string;
}
export interface SignInDetails {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [authError, setAuthError] = useState<string | null>(null);
  const callbackUrl = searchParams.get('seatCount')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isLoggedIn } = useSessionStatus();
  if (isLoggedIn) {
    router.push(
      callbackUrl && typeof callbackUrl === "string" ? callbackUrl : "/user"
    );
  }

  const formFields: Array<FormField> = [
    { name: "email", display: "Email address", default: "test@test.test" },
    { name: "password", display: "Password", default: "test" },
  ];

  const handleSignIn = handleSubmit((data) => {
    console.log({ data })
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then(
      // @ts-expect-error (docs for signIn return value conflict with TypeScript)
      ({ error }) => {
        if (error) setAuthError(error);
      }
    )
  });

  return (
    <Flex minH="84vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" py={6} px={6}>
        <Heading textAlign="center">Sign in to your account</Heading>
        <Stack
          rounded="lg"
          bg="gray.50"
          color="gray.900"
          boxShadow="lg"
          maxW="lg"
          minW="lg"
          p={8}
          alignSelf="center"
          spacing={4}
        >
          <form data-testid="sign-in-form">
            {formFields.map((field) => (
              <Field
                key={field.name}
                label={field.display}
                required
                {...(!!errors[field.name] ? { errorText: `${field.display} is required` } : {})}
              >
                <Input
                  type={field.name}
                  defaultValue={field.default}
                  {...register(field.name, {
                    required: true,
                  })}
                />
              </Field>
            ))}
            <Flex
              mt={4}
              justifyContent="flex-end"
              style={{ fontFamily: "Unica One" }}
            >
              <Button
                bgColor="gray.300"
                disabled={isLoading}
                onClick={handleSignIn}
              >
                <LoadingSpinner display={isLoading} /> Sign in
              </Button>
            </Flex>
          </form>
        </Stack>
        {authError ? <SignInError error="Sign in failed" /> : null}
      </Stack>
    </Flex>
  );
}
