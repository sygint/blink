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
    icon: "#888"
  },
  breakpoint: {
    mobileLandscape: `(min-width: ${size.mobileLandscape})`,
    tabletPortrait: `(min-width: ${size.tabletPortrait})`
  }
};
