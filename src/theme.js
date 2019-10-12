const size = {
  mobileLandscape: "480px",
  tabletPortrait: "768px"
};

export default {
  dimension: {
    mastheadHeight: "60px",
    mastheadPadding: "24px"
  },
  color: {
    main: "rgb(23, 50, 97)",
    third: "#ccc",
    button: "rgb(23, 50, 97)",
    buttonBorder: "rgb(23, 50, 97)", // darken($button-color, 0.5)
    icon: "#888",
    sidebarText: "#444"
  },
  breakpoint: {
    mobileLandscape: `(min-width: ${size.mobileLandscape})`,
    tabletPortrait: `(min-width: ${size.tabletPortrait})`
  }
};
