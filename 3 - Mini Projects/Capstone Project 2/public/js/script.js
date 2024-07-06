function truncateText(text, limit) {
    const trimmedText = text.trim();
    const words = trimmedText.split(' ');
    const truncatedWords = words.slice(0, limit);
    const truncatedText = truncatedWords.join(' ');
    if (words.length > limit) {
      return truncatedText + '...';
    } else {
      return truncatedText;
    }
  }
  