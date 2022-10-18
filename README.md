# Timeclicker (Fun project)

### Redirect to different link based on time of a video

## Uses 🪴

Double click on video on certain time to redirect to different links.

## Installation 🐧

- React

  ```bash
  npm i timeclicker
  ```

  ```javascript
  import timeclicker from "timeclicker";
  import { useRef, useEffect } from "react";

  export default function Player() {
    const videoRef = useRef();

    useEffect(() => {
      timeclicker({
        videoElem: videoRef.current,
        config: [
          {
            unit: "sec", // sec, min
            before: 10,
            url: "https://thetuhin.com/10",
          },
          {
            unit: "sec",
            after: 10,
            before: 15,
            url: "https://thetuhin.com/10-15",
          },
          {
            unit: "sec",
            after: 15,
            url: "https://thetuhin.com/15",
          },
        ],
        // or you can use text config as well
      });
    }, []);

    return (
      <div>
        {/*  You can use other video player as well, just pass the video element */}
        <video ref={videoRef}></video>
      </div>
    );
  }
  ```

- HTML

  ```bash
  npm i timeclicker
  ```

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <body>
      <video id="myVideo" controls autoplay>
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>
    </body>

    <script type="module">
      import timeclicker from "https://esm.sh/timeclicker"; // or window.timeclicker
      // double click while playing the video

      timeclicker({
        videoElem: document.getElementById("myVideo"),
        config: [
          "if before 10 sec open https://thetuhin.com/10",
          "if after 10 sec but before 15 sec open https://thetuhin.com/10-15",
          "if after 15 sec open https://thetuhin.com/15",
        ],
        // or you can use json config as well
      });
    </script>
  </html>
  ```

## Note 📝

Made by [Tuhin](https://github.com/tuhinpal) in Sunday. License is MIT.
