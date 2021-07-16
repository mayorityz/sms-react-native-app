// sor the prefix for gsm service providers
/**
 * airtel, - 0701, 0708, 0802, 0808, 0812, 0901, 0902, 0904, 0907, 0912
 * mtn - 07025, 07026, 0703, 0704, 0706, 0803, 0806, 0810, 0813, 0814, 0816, 0903, 0906, 0913, 0916
 * glo - 0705, 0805, 0807, 0811, 0815, 0905, 0915
 * 9mobile - 0809, 0817, 0818, 0909, 0908,
 * we need to switch case thru these
 */

export const getServiceNetwork = (mobileNumber) => {
  // extract first 4 digits.
  const prefix = mobileNumber.slice(0, 4);
  switch (prefix) {
    //airtel
    case "0701":
    case "0802":
    case "0808":
    case "0812":
    case "0901":
    case "0902":
    case "0904":
    case "0907":
    case "0912":
    case "0708":
      return "04";
      break;
    case "0703":
    case "0704":
    case "0706":
    case "0803":
    case "0806":
    case "0810":
    case "0813":
    case "0814":
    case "0816":
    case "0903":
    case "0906":
    case "0913":
    case "0916":
      return "01";
      break;

    case "0705":
    case "0805":
    case "0807":
    case "0811":
    case "0815":
    case "0905":
    case "0915":
      return "02";
      break;

    case "0809":
    case "0817":
    case "0818":
    case "0909":
    case "0908":
      return "03";
      break;

    default:
      return null;
      break;
  }
};

export const mask = (phone) => {
  return phone.slice(0, 7) + "-XXXX";
};
