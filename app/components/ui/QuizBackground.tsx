import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { quizBackgroundStyles as styles } from "../../../assets/style/quizBackground.styles";

type QuizBackgroundProps = {
  children: ReactNode;
  /**
   * - "loose": tout passe en #DE3162 (sauf les ombres)
   * - "win": tout passe en #4BAB41 (sauf les ombres)
   * - undefined: couleurs d'origine
   */
  variant?: "loose" | "win";
};

export function QuizBackground({ children, variant }: QuizBackgroundProps) {
  const activeFill = variant === "loose" ? "#DE3162" : variant === "win" ? "#4BAB41" : undefined;
  const rootBackground = activeFill ? `${activeFill}60` : "#FFF9E4";
  const triangleFill = activeFill ?? "#12ABBF";
  const squareFill = activeFill ?? "#4BAB41";
  const centerCircleFill = activeFill ?? "#DE3162";
  const bottomCircleFill = activeFill ?? "#F1B938";

  return (
    <View style={[styles.root, { backgroundColor: rootBackground }]}>
      <View pointerEvents="none" style={styles.decorLayer}>
        <View
          style={[
            styles.shapeOuter,
            styles.triangleTopLeftOuter,
            { opacity: activeFill ? 1 : 0.25 },
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 64 89" preserveAspectRatio="xMidYMid meet" fill={triangleFill}>
            <Path
              d="M18.8241 5.64346C23.7231 0.744619 32.0876 2.98597 33.8809 9.67791L48.0628 62.606C49.8559 69.2981 43.7325 75.422 37.0403 73.6288L-15.8875 59.4468C-22.5795 57.6537 -24.8206 49.2886 -19.9218 44.3896L18.8241 5.64346Z"
              stroke="black"
              strokeWidth={6}
            />
          </Svg>
        </View>
        <View
          style={[
            styles.shapeOuter,
            styles.squareTopRightOuter,
            { opacity: activeFill ? 1 : 0.25 },
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 51 81" preserveAspectRatio="xMidYMid meet" fill={squareFill}>
            <Rect
              y={22.6025}
              width={54.9845}
              height={54.9845}
              rx={6}
              transform="rotate(-24.272 0 22.6025)"
              stroke="black"
              strokeWidth={6}
            />
          </Svg>
        </View>
        <View
          style={[
            styles.shapeOuter,
            styles.circleCenterOuter,
            { opacity: activeFill ? 1 : 0.25 },
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 135 135" preserveAspectRatio="xMidYMid meet" fill={centerCircleFill}>
            <Circle
              cx={67.2214}
              cy={67.2214}
              r={49.5}
              transform="rotate(-28.7923 67.2214 67.2214)"
              stroke="black"
              strokeWidth={6}
            />
          </Svg>
        </View>
        <View
          style={[
            styles.shapeOuter,
            styles.circleBottomLeftOuter,
            { opacity: activeFill ? 1 : 0.25 },
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 114 181" preserveAspectRatio="xMidYMid meet" fill={bottomCircleFill}>
            <Circle cx={17.5} cy={84.5} r={81.5} fill={bottomCircleFill} stroke="black" strokeWidth={6} />
          </Svg>
        </View>
        <View style={[styles.shapeOuter, styles.squareBottomRightOuter, { opacity: activeFill ? 1 : 0.25 }]}>
          <Svg width="100%" height="100%" viewBox="0 0 51 81" preserveAspectRatio="xMidYMid meet" fill={squareFill}>
            <Rect
              y={22.6025}
              width={54.9845}
              height={54.9845}
              rx={6}
              transform="rotate(-24.272 0 22.6025)"
              stroke="black"
              strokeWidth={4}
            />
          </Svg>
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
