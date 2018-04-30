export function getSummary(text) {
  let summary = text.split(" ");
  if (summary.length > 16) {
    return summary
      .splice(0, 16)
      .join(" ")
      .concat("...");
  } else {
    return summary.join(" ");
  }
}
