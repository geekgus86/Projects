export function guid() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function mapColors(color) {
  const c = {
    "#c32112": "#EF524C",
    "#46b978": "#19AC73",
    "#FFFFFF": "#D7DFEB",
    "#ff6d10": "#F16D38",
    "#034ea2": "#0C4E8A",
    "#41B1D6": "#41B1D6",
    "#4C4E4F": "#4C4E4F"
  };
  return c[color] || color;
}

export function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const isObjectEmpty = (object) => {
  if (!object) {
    return true
  }
  return Object.keys(object).length === 0
}