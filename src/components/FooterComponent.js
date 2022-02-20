const FooterComponent = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div
        className="text-center text-light p-3"
        style={{backgroundColor: "gray"}}
      >
        &copy; {new Date().getFullYear()} Copyright : Pakorn Sukmankong
      </div>
    </footer>
  );
};

export default FooterComponent;
