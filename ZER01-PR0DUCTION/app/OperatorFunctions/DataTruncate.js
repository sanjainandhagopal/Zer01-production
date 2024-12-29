// Truncate the description to a fixed length
export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...more";
    }
    return text;
  };