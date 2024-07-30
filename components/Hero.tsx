import {
  Container,
  Title,
  List,
  ThemeIcon,
  rem,
  Group,
  Button,
  Highlight,
  Text,
  Stack,
  Blockquote,
} from "@mantine/core";

export default function Hero() {
  return (
    <Container fluid bg={"gray.8"} p="3rem">
      <Stack gap="xl">
        <Text
          size="4rem"
          variant={"gradient"}
          gradient={{ from: "indigo", to: "lime" }}
        >
         
            A perfectly okay demo application.
      
        </Text>
        <Group gap="xl" justify="space-between" px="4rem" py="12">
          <Text size="lg" miw="10rem" maw="45rem">
            A perfectly reasonable and simple NextJs app. Built with no other
            alternative purposes or use, simply a basic, clean, healthy, example
            app. Any additional uses are just coincidence and cannot be used
            against us. As a wise man once said "Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat."
          </Text>
          <Blockquote  radius="xl" cite="– R. Engineer">
            Yeah this definitely is an example application. I suppose it will
            work as a demo of what not to do in certain cases.
          </Blockquote>
        </Group>
      </Stack>
    </Container>
  );
}
