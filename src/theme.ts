// https://github.com/styled-components/styled-components-website/issues/447
export default {
  dimension: {
    mastheadHeight: "60px",
    mastheadPadding: "24px"
  },
  color: {
    main: "rgb(23, 50, 97)" as "rgb(23, 50, 97)",
    third: "#ccc" as "#ccc",
    button: "rgb(23, 50, 97)" as "rgb(23, 50, 97)",
    buttonBorder: "rgb(23, 50, 97)" as "rgb(23, 50, 97)", // darken($button-color, 0.5)
    icon: "#888" as "#888",
    sidebarText: "#444" as "#444"
  },
  breakpoint: {
    mobileLandscape: '(min-width: "480px")' as '(min-width: "480px")',
    tabletPortrait: '(min-width: "768px")' as '(min-width: "768px")'
  }
};
