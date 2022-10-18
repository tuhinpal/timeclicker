export default function timeclicker({ videoElem, config }) {
  try {
    let parseConfig = [];

    if (config.length > 0) {
      console.log("No config provided");
    }

    config.forEach((item) => {
      if (
        typeof item === "object" &&
        (item.before || item.after) &&
        item.unit &&
        item.url
      ) {
        try {
          let unitMultiplier = item.unit === "min" ? 60 : 1;
          if (item.before) item.before = item.before * unitMultiplier;
          if (item.after) item.after = item.after * unitMultiplier;
          parseConfig.push(item);
        } catch (_) {}
      }

      if (typeof item === "string") {
        try {
          if (item.includes(" but ")) {
            // "if after 10 sec but before 15 sec open https://thetuhin.com/10-15",
            let operator =
              /if (after|before) (\d+) (sec|min) but (after|before) (\d+) (sec|min) open (.*)/g.exec(
                item
              );
            let unitMultiplier1 = operator[3] === "min" ? 60 : 1;
            let obj = {};
            obj[operator[1]] = operator[2] * unitMultiplier1;
            let unitMultiplier2 = operator[6] === "min" ? 60 : 1;
            obj[operator[4]] = operator[5] * unitMultiplier2;
            obj.url = operator[7];
            parseConfig.push(obj);
          } else {
            // "if after 15 sec open https://thetuhin.com/15"
            let operator = /if (after|before) (\d+) (sec|min) open (.*)/g.exec(
              item
            );
            let unitMultiplier = operator[3] === "min" ? 60 : 1;
            let obj = {};
            obj[operator[1]] = operator[2] * unitMultiplier;
            obj.url = operator[4];
            parseConfig.push(obj);
          }
        } catch (e) {
          console.log(`"${item}" text parse error`, e);
        }
      }
    });

    // if has before and after throw it in first, if have only before, put it in second and if only after, put it in third
    let parsedConfigFirst = parseConfig.filter(
      (item) => item.before && item.after
    );
    let parsedConfigSecond = parseConfig.filter(
      (item) => item.before && !item.after
    );
    let parsedConfigThird = parseConfig.filter(
      (item) => !item.before && item.after
    );
    parseConfig = [
      ...parsedConfigFirst,
      ...parsedConfigSecond,
      ...parsedConfigThird,
    ];

    videoElem.addEventListener("click", function (e) {
      let currentTime = e.target.currentTime;
      if (currentTime < 2) return;

      setTimeout(() => {
        videoElem.play();
      }, 10);

      for (const item of parseConfig) {
        try {
          if (
            item.before &&
            item.after &&
            currentTime < item.before &&
            currentTime > item.after
          ) {
            window.open(item.url, "_blank");
            break;
          }

          if (item.before && !item.after && currentTime < item.before) {
            window.open(item.url, "_blank");
            break;
          }

          if (!item.before && item.after && currentTime > item.after) {
            window.open(item.url, "_blank");
            break;
          }
        } catch (err) {
          console.log(`${item} error`, error);
        }
      }
    });
  } catch (error) {
    console.log("Uncatched error", error);
  }
}

window.timeclicker = timeclicker;
