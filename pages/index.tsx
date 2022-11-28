import { Box, Flex, Group, Paper, Text, Title } from "@mantine/core";
import axios from "axios";
import { isError, useQuery } from "@tanstack/react-query";
import { getCurrentSeason } from "../utils/GetCurrentSeason";
import { useTypedRef } from "../hooks/useTypedRef";
import styles from "../styles/Home.module.css";
import { FormGetWeather } from "../components/form";
import { env } from "process";
import Head from "next/head";

// Fixing the useRef issue ✅
// .env File ✅
// Type checking
// external getCurrentSeason() ✅
// UI changes ✅
// create type array for data
// Clear value input after fetching data ✅
// isError checking ✅

export default function Home() {
  const cityRef = useTypedRef();

  const handleWeather = (e: any) => {
    e.preventDefault();
    if (cityRef.current.value) {
      refetch();
      cityRef.current.value = "";
    }
  };

  const { isFetching, isSuccess, isError, error, fetchStatus, data, refetch } =
    useQuery(
      ["weathers"],
      () =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current?.value}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
          )
          .then((res) => res.data),
      { refetchInterval: 40000, refetchOnWindowFocus: false, enabled: false }
    );

  // Note: API key gets from https://home.openweathermap.org/api_keys after sign up

  return (
    <div className={styles.mainWrapper}>
      <Head>
        <title>Next Weather App</title>
      </Head>
      <Paper className={styles.paper} p="lg">
        <Box ta={"center"}>
          <Title
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            order={2}
          >
            Next 13 Weather App!
          </Title>
          <Text fs="italic" c="dimmed">
            Enter a city, and get the weather below
          </Text>
        </Box>

        <FormGetWeather
          cityRef={cityRef}
          handleWeather={handleWeather}
          isFetching={isFetching}
        />

        {isFetching && (
          <Title
            mt="xl"
            ta="center"
            variant="gradient"
            gradient={{ from: "blue", to: "#ec8c69", deg: 45 }}
            order={4}
          >
            Loading...
          </Title>
        )}

        {isError && (
          <Title
            mt="xl"
            ta="center"
            variant="gradient"
            gradient={{ from: "red", to: "orange", deg: 45 }}
            order={4}
          >
            City not found or server failed to connect. <br /> Please, try
            again!
          </Title>
        )}

        {isSuccess && !isFetching && (
          <Box mt={"xl"} maw="270px" mx="auto">
            <Title
              mt="md"
              ta="center"
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              order={4}
            >
              {data.name}
            </Title>
            <Flex justify="space-between" align="center">
              <Flex align="flex-start" direction="column">
                <Flex align="baseline" gap="6px">
                  <Text fz={"2.5rem"}> {data.main.temp}</Text> &deg;C
                </Flex>
                <Text transform="capitalize">
                  {data.weather[0].description}
                </Text>
                <Text my={"xs"} color="indigo" style={{ wordSpacing: "8px" }}>
                  {getCurrentSeason()}
                </Text>
              </Flex>
              <Flex align="center" direction="column" mt="2rem">
                <Text c="dimmed" mb="-1rem">
                  {data.weather[0].main}
                </Text>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].main}
                  width={120}
                  height={120}
                />
              </Flex>
            </Flex>
          </Box>
        )}
      </Paper>
    </div>
  );
}
