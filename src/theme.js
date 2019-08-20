const size = {
  mobileLandscape: "480px",
  tabletPortrait: "768px"
};

export default {
  color: {
    third: "#ccc"
  },
  breakpoint: {
    mobileLandscape: `(min-width: ${size.mobileLandscape})`,
    tabletPortrait: `(min-width: ${size.tabletPortrait})`
  }
};
