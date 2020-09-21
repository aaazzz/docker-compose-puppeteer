const launchOptions = () => {
  return {
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  }
}

const getViewPortOption = (device) => {
  switch (device) {
    case "sp":
      return { width: 360, height: 800 };
    case "tablet":
      return { width: 768, height: 800 };
    case "desktop":
      return { width: 1024, height: 800 };
    default:
      return false
  }
}

module.exports = {
  launchOptions,
  getViewPortOption
}
