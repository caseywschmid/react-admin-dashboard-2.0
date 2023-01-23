// This file sets up all the colors and typography of the website. For this
// project, created a light and dark mode in a different way from the previous
// project. The previous project used useMode and React Context to set the mode. 
// This time, I'm using redux to manage state and that is configured elsewhere. 

// The main colors for this project are:
// #666666 - Grey
// #21295C - Space Cadet - Primary
// #FFD166 - Orange Yellow Crayola - Secondary

// Alternate Options include:
// #666666 - Grey
// #0A2E36 - Gunmetal - Primary
// #F58A07 - Tangerine - Secondary

// #666666 - Grey
// #001427 - Oxford Blue - Primary
// #79B473 - Bud Green - Secondary

// color design tokens
// installed Tailwind Shades to help with this - allows you to control different shades of colors
// Type the hex code for the color, highlight and press cmd+K, cmd+G to use it

export const tokensDark = {
  grey: {
    0: "#ffffff", // manually added
    10: "#f6f6f6", // manually added
    50: "#f0f0f0", // manually added
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually added
  },
  primary: {
    // Space Cadet
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // Orange Yellow Crayola
    50: "#f0f0f0", // manually added
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

export const tokensLight = {
  grey: {
    0: "#000000", // manually added
    10: "#141414",
    50: "#292929",
    100: "#3d3d3d",
    200: "#525252",
    300: "#666666",
    400: "#858585",
    500: "#a3a3a3",
    600: "#c2c2c2",
    700: "#e0e0e0",
    800: "#f0f0f0", // manually added
    900: "#f6f6f6", // manually added
    1000: "#ffffff", // manually added
  },
  primary: {
    // Space Cadet
    100: "#070812",
    200: "#0d1025",
    300: "#141937",
    400: "#191F45", // manually adjusted
    500: "#21295c",
    600: "#4d547d",
    700: "#7a7f9d",
    800: "#a6a9be",
    900: "#d3d4de",
  },
  secondary: {
    // Orange Yellow Crayola
    50: "#332a14",
    100: "#665429",
    200: "#997d3d",
    300: "#cca752",
    400: "#ffd166",
    500: "#ffda85",
    600: "#ffe3a3",
    700: "#ffedc2",
    800: "#fff6e0",
    900: "#f0f0f0", // manually added
  },
};

// mui theme settings

// To get the material theme to use the colors you picked you have to tell it
// which ones to use. themeSettings pulls the colors from above ('tokens'),
// based on the mode and returns an object of colors that mui can read

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
