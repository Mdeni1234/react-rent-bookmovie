const MovieContent = (props) => {
  let { item } = props;
  return (
    <div className="h-full m-0">
      <iframe
        width="100%"
        height="100%"
        src={item}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
export default MovieContent;
