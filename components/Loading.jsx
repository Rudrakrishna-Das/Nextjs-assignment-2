const Loading = () => {
  return (
    <section className="w-[10%] mx-auto m-[12rem]">
      <div className="w-20 h-20 border-4 border-x-green-800 border-y-transparent rounded-full animate-spin"></div>
      <div className="load w-12 h-12 border-4 border-y-green-800 border-x-transparent rounded-full relative -top-[4rem] left-4"></div>
    </section>
  );
};

export default Loading;
