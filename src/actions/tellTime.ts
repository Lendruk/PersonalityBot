/**
 * Place holder function for debugging commands
 */
export default function tellTime(options: { inMillis?: boolean, format?: string }) {
  const { inMillis, format } = options;
  if(inMillis) {
    return Date.now();
  } else {
    if(format) {
      return `Demasiado lazy para implementar o format arg: ${format}`;
    }

    return `São ${new Date().toISOString()}`;
  }
}