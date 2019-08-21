const size = {
  mobileLandscape: "480px",
  tabletPortrait: "768px"
};

export default {
  dimension: {
    mastheadHeight: "60px"
  },
  color: {
    third: "#ccc",
    button: "rgb(23, 50, 97)",
    buttonBorder: "rgb(23, 50, 97)", // darken($button-color, 0.5)
    icon: "#888"
  },
  breakpoint: {
    mobileLandscape: `(min-width: ${size.mobileLandscape})`,
    tabletPortrait: `(min-width: ${size.tabletPortrait})`
  }
};
