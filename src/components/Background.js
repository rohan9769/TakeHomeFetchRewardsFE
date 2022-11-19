const Background = () => (
    <>
      <img
        className="absolute w-full bottom-0"
        src={`${process.env.PUBLIC_URL}/images/backgroundImage/layered-waves-haikei purple.svg`}
        alt="background"
      />
      <img
        className="absolute w-full lg:bottom-0"
        // src={`${process.env.PUBLIC_URL}/images/background/star-scatter-haikei-yellow.svg`}
        src={`${process.env.PUBLIC_URL}/images/backgroundImage/goldenstars.svg`}
        alt="background"
      />
    </>
  );
  export default Background;
  