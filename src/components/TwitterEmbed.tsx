export default function TwitterEmbed() {
  return (
    <div className="tweet">
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          <a href="https://twitter.com/kirat_tw?ref_src=twsrc%5Etfw">
            @kirat_tw
          </a>{" "}
          Dropped another bomb.<br></br> Excited to join and Explore{" "}
          <a href="https://t.co/Fw0vIit1iY">pic.twitter.com/Fw0vIit1iY</a>
        </p>
        &mdash; Ayush Gopal (@iamAyushgopal){" "}
        <a href="https://twitter.com/iamAyushgopal/status/2002742332660257012?ref_src=twsrc%5Etfw">
          December 21, 2025
        </a>
      </blockquote>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
  );
}
