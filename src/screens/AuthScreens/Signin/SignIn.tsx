import { View, Text } from "react-native";
import React from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";

export default function SignIn() {
  return (
    <Container>
      <LineraBgContainer reverse>
        <Text>SignIn</Text>
      </LineraBgContainer>
    </Container>
  );
}
