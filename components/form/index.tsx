import { Button, Group, TextInput } from "@mantine/core";
import { FormGetWeatherProps } from "./type";

export const FormGetWeather = (props: FormGetWeatherProps) => {
  return (
    <form>
      <Group position="apart" spacing="sm" align="flex-end" mt="md">
        <TextInput
          label="City name"
          placeholder="ex: Tashkent"
          size="md"
          ref={props.cityRef}
          defaultValue=""
        />
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          size="md"
          onClick={props.handleWeather}
          disabled={props.isFetching ? true : false}
        >
          Get Weather
        </Button>
      </Group>
    </form>
  );
};
