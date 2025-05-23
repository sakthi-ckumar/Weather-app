export const filterNewsByWeather = (weather, articles) => {
  if (weather?.temp < 10) {
    return articles?.filter((a) => /death|crisis|fail|suffer/i.test(a?.title));
  } else if (weather?.temp > 30) {
    return articles?.filter((a) => /fear|panic|danger|terror/i.test(a?.title));
  } else {
    return articles?.filter((a) => /win|happy|success|joy/i.test(a?.title));
  }
};
