import { ReactNode } from "react";
import { View } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { quizBackgroundStyles as styles } from "../../../assets/style/quizBackground.styles";

type QuizBackgroundProps = {
  children: ReactNode;
};

export function QuizBackground({ children }: QuizBackgroundProps) {
  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.decorLayer}>
        <View
          style={[
            styles.shapeOuter,
            styles.triangleTopLeftOuter,
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 64 89" preserveAspectRatio="xMidYMid meet" fill="#12ABBF">
            <Path
              d="M16.7026 3.52211C23.2346 -3.00986 34.3882 -0.0212895 36.7791 8.90155L50.961 61.8294C53.3519 70.7522 45.1869 78.9172 36.2641 76.5263L-16.6638 62.3443C-25.5866 59.9535 -28.5752 48.7999 -22.0432 42.268L16.7026 3.52211Z"
              fill="#12ABBF"
            />
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
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 51 81" preserveAspectRatio="xMidYMid meet" fill="#4BAB41">
            <Rect
              y={22.6025}
              width={54.9845}
              height={54.9845}
              rx={9}
              transform="rotate(-24.272 0 22.6025)"
            />
            <Rect
              x={3.96802}
              y={24.1041}
              width={48.9845}
              height={48.9845}
              rx={6}
              transform="rotate(-24.272 3.96802 24.1041)"
              stroke="black"
              strokeWidth={5}
            />
          </Svg>
        </View>
        <View
          style={[
            styles.shapeOuter,
            styles.circleCenterOuter,
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 135 135" preserveAspectRatio="xMidYMid meet" fill="#DE3162">
            <Circle
              cx={67.2214}
              cy={67.2214}
              r={49.5}
              transform="rotate(-28.7923 67.2214 67.2214)"
            />
            <Circle
              cx={67.2214}
              cy={67.2214}
              r={46.5}
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
          ]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 114 181" preserveAspectRatio="xMidYMid meet" fill="#F1B938">
            <Circle cx={17.5} cy={84.5} r={84.5} fill="#F1B938" />
            <Circle cx={17.5} cy={84.5} r={81.5} stroke="black" strokeWidth={6} />
          </Svg>
        </View>
        <View style={[styles.shapeOuter, styles.squareBottomRightOuter]}>
          <Svg width="100%" height="100%" viewBox="0 0 51 81" preserveAspectRatio="xMidYMid meet" fill="#4BAB41">
            <Rect
              y={22.6025}
              width={54.9845}
              height={54.9845}
              rx={9}
              transform="rotate(-24.272 0 22.6025)"
            />
            <Rect
              x={3.96802}
              y={24.1041}
              width={48.9845}
              height={48.9845}
              rx={6}
              transform="rotate(-24.272 3.96802 24.1041)"
              stroke="black"
              strokeWidth={2}
            />
          </Svg>
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
