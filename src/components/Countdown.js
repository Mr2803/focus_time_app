import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { spacing, fontSizes } from "../utils/sizes";
import { colors } from "../utils/colors";

const minutesToMillisec = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const interval = useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }
      console.log(time);
      const timeLeft = time - 1000;

      return timeLeft;
    });
  };
  useEffect(() => {
    if (isPaused) {
      console.log(interval.current);
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillisec(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillisec(minutes));
    if (millis === 0) onEnd();
  }, [millis]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(112,100,103,0.5)",
  },
});
